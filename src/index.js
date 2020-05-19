/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-webpack-loader-syntax */
import React from 'react';
import ReactDOM from 'react-dom';
import OrderbookWorker from 'worker-loader!./services/orderbook/worker';
import 'styles/main.scss';
import { orderBook as orderBookClass } from 'styles/_variables.scss';
import Layout from 'components/Layout';
import ErrorBoundary from 'containers/ErrorBoundary';
import { serializeOrderBook } from 'services/orderbook/helpers';
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
        const { asks, bids } = serializeOrderBook(e.data);
        const currentTime = new Date().toLocaleTimeString();
        const latestTrade = generateLatestTrade(asks, bids, currentTime);
        this.setState({
          orderBook: { asks, bids },
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
    const { currentTime, latestTradePrice, orderBook, latestTrades } = this.state;
    // add a basic depth chart
    return (
      <ErrorBoundary>
        <Layout>
          <DepthChart />
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
