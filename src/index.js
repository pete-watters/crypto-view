import React from 'react';
import ReactDOM from 'react-dom';
import OrderbookWorker from 'worker-loader!./orderbook/worker';
import './styles/main.scss';
import Header from './components/Header';
import { sanitiseOrderBook, mapCumulativeVolume, sortByColumn, sumFloats } from './tools/format';
import OrderBook from './features/orderbook/';
import DepthChart from './features/depth-chart/DepthChart';

class App extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
      orderBook: {
        asks: [],
        bids: []
      },
      currentTime: null,
      latestTrades: [],
      latestTradePrice: null,
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
        // Try figure out an optimal algo here to avid the double mapping
        const totalVolumeAsks = cleanAsks.map(item => item[1]).reduce((a,b) => sumFloats(a,b));
        const asks = mapCumulativeVolume(sortedAsks, 'ask', totalVolumeAsks );
        const bids = mapCumulativeVolume(sortedBids, 'bid', 0 );
        
        const getRandomLastOrder = (ask, bid) => {
          const type = Math.round(Math.random()) === 1
          ? ['ask', ask]
          : ['bid', bid];
          return [type[0], type[1].join().replace(',', "")];

        };
        const currentTime =  new Date().toLocaleTimeString();
        const randomLastOrder = getRandomLastOrder(bids[0][0],asks[asks.length-1][0]);
        const latestTrade = [ ...randomLastOrder, Number(Math.random()).toFixed(8), currentTime];
        // could be a selector
        const tradeList = this.state.latestTrades.length <= 5 ? this.state.latestTrades: [];
        this.setState({
            orderBook: { asks, bids }, 
            currentTime,
            latestTrades: [ ...tradeList, latestTrade],
            latestTradePrice: latestTrade[1]
        });
        // make this be either last ask or first bid
      };
    }
  }
  componentWillUnmount(){
    window.Worker.terminate();
  }

  render() {
    const { currentTime, latestTradePrice, orderBook, latestTrades } = this.state;
    // TODOs
    // refactor clean
    // add unit tests
    // add new static component for UL and LI tables
    // add a HOC for article elements
    // rename components - no need to repeat OrderBook X etc.
    // add error Boundary + loading
    // add a basic depth chart
    return (
      <>
      <Header />
      <DepthChart />
      <aside className="orderbook">
        <OrderBook data={orderBook} latestTradePrice={latestTradePrice} />
      <article>
        <h3>{currentTime}</h3>
      </article>
      <article>
        <ul>    
        {latestTrades && latestTrades.map(([type, price, volume, time], index) => {
          return(
            <li key={`${index}-${time}`}>
              <span className={type}>{price}</span>
              <span>{volume}</span>
              <span>{time}</span>
            </li>);
        }
        )
          }
        </ul>
      
      </article>
      </aside>
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
