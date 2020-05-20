/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-webpack-loader-syntax */
import React from 'react';
import ReactDOM from 'react-dom';
import OrderbookWorker from 'worker-loader!./services/orderbook/worker';
import 'styles/main.scss';
import { orderBook as orderBookClass } from 'styles/_variables.scss';
import Layout from 'components/Layout';
import ErrorBoundary from 'containers/ErrorBoundary';
import { serializeOrderBook, sanitiseSourceData } from 'services/orderbook/helpers';
import OrderBook from 'features/orderbook/OrderBook';
import DepthChart from 'features/depth-chart/DepthChart';
import LatestTrades from 'features/latest-trades/LatestTrades';
import { getLatestTrades, generateLatestTrade } from 'features/latest-trades/helpers';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderBook: {
        asks: [],
        bids: [],
      },
      depthChart: {
        asks: [],
        bids: [],
      },
      currentTime: null,
      latestTrades: [],
      latestTradePrice: null,
    };
  }

  componentDidMount() {
    if (window.Worker) {
      this.ob = new OrderbookWorker();
      this.ob.onmessage = e => {
        const { latestTrades } = this.state;
        // debugger;
        const asks = sanitiseSourceData(e.data.asks);
        const bids = sanitiseSourceData(e.data.bids);
        const { asks: orderBookAsks, bids: orderBookBids } = serializeOrderBook(asks, bids);
        // console.log(pete);
        const currentTime = new Date().toLocaleTimeString();
        const latestTrade = generateLatestTrade(asks, bids, currentTime);
        // debugger;
        this.setState({
          orderBook: { asks: orderBookAsks, bids: orderBookBids},
          depthChart: { asks, bids },
          currentTime,
          latestTrades: getLatestTrades(latestTrades, latestTrade),
          latestTradePrice: latestTrade[1],
        });
      };
    }
  }

  componentWillUnmount() {
    this.ob.terminate();
  }

  render() {
    const { currentTime, depthChart, latestTradePrice, latestTrades, orderBook } = this.state;
    // console.log('OrderBook', depthChart.asks.length > 0);
    return (
      <ErrorBoundary>
        <Layout>
          {depthChart.asks.length > 0 && <DepthChart data={depthChart} />}
          <aside className={orderBookClass}>
            <OrderBook data={orderBook} latestTradePrice={latestTradePrice} />
            <article>
              <h3>{currentTime}</h3>
            </article>
            <article>
              <LatestTrades latestTrades={latestTrades} />
            </article>
          </aside>
        </Layout>
      </ErrorBoundary>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
