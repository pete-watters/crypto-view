import React from 'react';
import ReactDOM from 'react-dom';
import OrderbookWorker from 'worker-loader!./orderbook/worker';
import './styles.scss';
import OrderBook from './features/orderbook/OrderBook';
// import DepthChart from './features/depth-chart/DepthChart';

const mock = {
  "orderBook":
  {"asks":[
    ["4.0117684918745967e+3",4.943500490412712],
    [4001.6435591891286,1.9837561075470833],
    [4002.0864291291296,10.159150103255728],
    [4003.0643851983245,8.104728782675124],
    [4004.9343737792997,5.969756767920126],
    [4005.085862318014,2.560062378313141],
    ["4.0117684918745967e+31", 9.324694957033788],
    [4007.3744199822518,8.652745154738213],
    [4008.9695297611092,9.994513724887021],
    [4009.511946542229,1.9281999372394785],
    [4010.3770299277,1.3529602531275982],
    [4011.4882993727124,2.355860498489971],
    [4012.500741403558,8.08809200681039],
    [4013.6279096344233,5.920499354501391],
    [4014.531026454332,10.473659044475195]
  ],
  "bids":[
    ["4.0117684918745967e+3",10.20489910239562],
    [3999.3265423318144,5.011830991214973],
    [3998.0024905760515,10.275482011785401],
    [3997.400103430008,6.987791106913175],
    [3996.311626816498,5.9163245524602175],
    [3995.673934003535,7.436610019451624],
    [3994.8421075444917,6.696688662136612],
    [3993.597122875352,4.740782056107166],
    [3992.350275243882,6.48887706532447],
    [3991.133782961895,6.182742746381422],
    [3990.0421074205015,2.4841877229536395],
    [3989.003063358906,9.280863761399349],
    [3988.6243106397465,10.083854194831599],
    [3987.4905023068045,1.1514025674878017],
    [3986.3843702376803,3.0095401044533503]]
  }};


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
        console.log(e.data);
        // this.setState({ orderBook: { asks: e.data.asks, bids: e.data.bids }});
        const { orderBook } = mock;
        this.setState({orderBook: { asks: orderBook.asks, bids: orderBook.bids}});
      };
    }
  }
  componentWillUnmount(){
    this.setState({orderBoook: null});
  }

  render() {
    const { orderBook } = this.state;
    console.log('Pete', this.state);
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
          <li key={index+1}>{Number(ask[0])} {Number(ask[1])}</li>
        )}
        </ul>
        {/* <OrderBook /> */}
        <ul>
        {orderBook && orderBook.bids.map((bid, index) => 
          <li key={index+1}>{bid[0]} {bid[1]}</li>
        )}
        </ul>
      </section>
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
