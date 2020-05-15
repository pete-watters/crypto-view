import React from 'react';
import ReactDOM from 'react-dom';
import OrderbookWorker from 'worker-loader!./orderbook/worker';
import './styles/main.scss';
import Header from './components/Header';
import { sanitiseOrderBook, mapCumulativeVolume, sortByColumn, sumFloats } from './tools/format';
import { OrderBook } from './features/orderbook/';
import DepthChart from './features/depth-chart/DepthChart';

class App extends React.Component {
	constructor (props) {
		super(props)

		this.state = {
			orderBook: { asks: [], bids: []}
		}
	}


  componentDidMount() {
    if (window.Worker) {
      this.ob = new OrderbookWorker();
      this.ob.onmessage = e => {
      // investigate this for optimal worker sorting
      //https://medium.com/prolanceer/optimizing-react-app-performance-using-web-workers-79266afd4a7
      //https://github.com/rohanBagchi/react-webworker-demo/tree/master/src
        const orderBook = e.data;    
        const cleanAsks = sanitiseOrderBook(orderBook.asks);
        const cleanBids = sanitiseOrderBook(orderBook.bids);
        const sortedAsks = sortByColumn(cleanAsks, 0);
        const sortedBids = sortByColumn(cleanBids, 0);
        // I amn't sorting bids at all here! I need to do that
        // Try figure out an optimal algo here to avid the double mapping
        const totalVolumeAsks = cleanAsks.map(item => item[1]).reduce((a,b) => sumFloats(a,b));
        const asks = mapCumulativeVolume(sortedAsks, 'ask', totalVolumeAsks );
        const bids = mapCumulativeVolume(sortedBids, 'bid', 0 );
        this.setState({orderBook: { asks, bids }});
      };
    }
  }
  componentWillUnmount(){
    window.Worker.terminate();
  }

  render() {
    const { orderBook } = this.state;
    // TODO add error Boundary + loading
    return (
      <>
      <Header />
      <DepthChart />
      <OrderBook data={orderBook} />
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
