/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-webpack-loader-syntax */
import React from 'react';
import ReactDOM from 'react-dom';
import OrderbookWorker from 'worker-loader!./services/orderbook/worker';
import 'styles/main.scss';
import { ask, bid } from 'styles/_variables.scss';
import { Header } from 'components/Header';
import { sanitiseOrderBook, mapCumulativeVolume } from 'features/orderbook/helpers';
import { sortByColumn } from 'tools/sort';
import { sumFloats } from 'tools/sum';
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
        // investigate this for optimal worker sorting
        // https://medium.com/prolanceer/optimizing-react-app-performance-using-web-workers-79266afd4a7
        // https://github.com/rohanBagchi/react-webworker-demo/tree/master/src
        const orderBook = e.data;
        const cleanAsks = sanitiseOrderBook(orderBook.asks);
        const cleanBids = sanitiseOrderBook(orderBook.bids);
        const sortedAsks = sortByColumn(cleanAsks, 0);
        const sortedBids = sortByColumn(cleanBids, 0);
        // Try figure out an optimal algo here to avid the double mapping
        const totalVolumeAsks = cleanAsks.map(item => item[1]).reduce((a, b) => sumFloats(a, b));
        // FIXME - ASK / BID repeated here
        const asks = mapCumulativeVolume(sortedAsks, ask, totalVolumeAsks);
        const bids = mapCumulativeVolume(sortedBids, bid, 0);
        const currentTime = new Date().toLocaleTimeString();
        const highestAsk = asks[asks.length - 1][0];
        const lowestBid = bids[0][0];
        const latestTrade = generateLatestTrade(highestAsk, lowestBid, currentTime);
        const { latestTrades } = this.state;

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
    // TODOs
    // refactor clean
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
            <LatestTrades latestTrades={latestTrades} />
          </article>
        </aside>
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
