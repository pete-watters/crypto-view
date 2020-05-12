import React from 'react';
import ReactDOM from 'react-dom';
import OrderbookWorker from 'worker-loader!./orderbook/worker';
import './styles.scss';
import { sanitiseOrderBook, mapCumulativeVolume, sort, sumFloats } from './tools/format';
import { mockOrderbook } from '../test/mock';
import OrderBook from './features/orderbook/OrderBook';
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
    const { orderBook } = this.state;
    // TODO add error Boundary + loading
    return (
      <>
      <header>
        <div className="logo">
        <svg viewBox="0 0 200 200">
          <path d="M65.9 100.2c0 13.1 3.6 23.6 10.7 31.4 6.7 7.1 15.9 10.7 30.2 10.7 10.9 0 19-1.7 25.4-5.2v-16.4c-8.6 3.8-16.9 6-25 6-15.9 0-23.3-8.3-23.3-26.4 0-18.3 7.8-27.1 24-27.1 5.5 0 12.1 1.7 20 5l6.7-15.2c-8.1-3.8-17.1-5.7-27.1-5.7-12.6 0-22.8 3.6-30.7 11.4-7.1 7-10.9 17.5-10.9 31.5zM10 190h180V10H10v180zM0 200V0h200v200H0z"></path>
        </svg>
        </div>
        <h1>Crypto View</h1>
      </header>
      <section className="page-container">
        <DepthChart />
        
      <aside className="orderbook-container">
        {/* CHECK think I have bids and asks backwards! */}
          <OrderBook>
            {orderBook && orderBook.asks.map(([price, [integral, decimal], [cumulativeIntegral, cumulativeDecimal]], index) => 
              <li key={index+1}>
                <span style={{color: "red"}}>{price} </span>
                <span>{integral}.<em>{decimal}</em></span>
                <span>{cumulativeIntegral}.<em>{cumulativeDecimal}</em></span>
              </li>
            )}
            </OrderBook>
            <OrderBook>
            {orderBook && orderBook.bids.map(([price, [integral, decimal], [cumulativeIntegral, cumulativeDecimal]], index) => 
              <li key={index+1}>
                <span style={{color: "green"}}>{price}</span>
                <span>{integral}.<em>{decimal}</em></span>
                <span>{cumulativeIntegral}.<em>{cumulativeDecimal}</em></span>
              </li>
            )}
            </OrderBook>
      </aside>
      </section>
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
