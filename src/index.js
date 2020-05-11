import React from 'react';
import ReactDOM from 'react-dom';
import OrderbookWorker from 'worker-loader!./orderbook/worker';
import './styles.scss';
import { mapOrderBookData, sort } from './tools/format';
import { mockOrderbook } from '../test/mock';
// import OrderBook from './features/orderbook/OrderBook';
// import DepthChart from './features/depth-chart/DepthChart';

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

    const { orderBook } = mockOrderbook;    
    const asks = mapOrderBookData(orderBook.asks, 0).sort(sort);
    const bids = mapOrderBookData(orderBook.bids, 0);
    this.setState({orderBook: { asks, bids }});
  }
  // componentWillUnmount(){
  //   this.setState({orderBook: null});
  //   window.Worker.terminate();
  // }

  render() {
    const { orderBook } = this.state;
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
        {/* <DepthChart /> */}
        <ul>
        {orderBook && orderBook.asks.map((ask, index) => 
          <li key={index+1}>{ask[0]} {ask[1]} {ask[2]}</li>
        )}
        </ul>
        {/* <OrderBook /> */}
        <ul>
        {orderBook && orderBook.bids.map((bid, index) => 
          <li key={index+1}>{bid[0]} {bid[1]} {bid[2]}</li>
        )}
        </ul>
      </section>
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
