import React from 'react';
import ReactDOM from 'react-dom';
import OrderbookWorker from 'worker-loader!./orderbook/worker';
import './styles/main.scss';
import Header from './components/Header';
import { sanitiseOrderBook, mapCumulativeVolume, sort, sumFloats } from './tools/format';
import { mockOrderbook } from '../test/mock';
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
        /*
          Worker returns orderbook data as:
          {
            e: {
              data: {
                asks: [[<price>, <volume>], ...],
                bids: [[<price>, <volume>], ...]
              }
            }
          }
        */
      //  e.data.asks.map(ask => typeof ask[0] === 'string' ? console.log(ask[0]) : '');
      // this.setState({ orderBook: { asks: e.data.asks, bids: e.data.bids }});
      };
    }
    // investigate this for optimal worker sorting
    //https://medium.com/prolanceer/optimizing-react-app-performance-using-web-workers-79266afd4a7
    //https://github.com/rohanBagchi/react-webworker-demo/tree/master/src
    const { orderBook } = mockOrderbook;    
    const cleanAsks = sanitiseOrderBook(orderBook.asks).sort(sort);
    const totalVolumeAsks = cleanAsks.map(item => item[1]).reduce((a,b) => sumFloats(a,b));

    console.log('totalVolumeAsks', totalVolumeAsks);
    const cleanBids = sanitiseOrderBook(orderBook.bids);
    console.log('cleanAsks',cleanAsks);
    console.log('cleanBids',cleanBids);
    const asks = mapCumulativeVolume(cleanAsks, 'ask', totalVolumeAsks );
    const bids = mapCumulativeVolume(cleanBids, 'bid', 0 );
    console.log('asks',asks);
    console.log('bids',bids);
    
    this.setState({orderBook: { asks, bids }});
  }
  // componentWillUnmount(){
  //   this.setState({orderBook: null});
  //   window.Worker.terminate();
  // }

  render() {
    // const { orderBook: { bids, asks } } = this.state;
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
