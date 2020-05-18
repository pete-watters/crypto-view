import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CRYPTO_VIEW } from 'constants';
import { bid, ask } from 'styles/_variables.scss';
import List from './components/List';
import MarketPrice from './components/MarketPrice';

class OrderBook extends Component {
  constructor() {
    super();
    this.state = {
      selectedPrice: '',
    };
    this.selectPrice = this.selectPrice.bind(this);
    this.updateHoverState = this.updateHoverState.bind(this);
  }

  selectPrice(price) {
    this.setState({ selectedPrice: price });
  }

  updateHoverState(row) {
    this.setState({ highlightRow: row });
  }

  render() {
    const {
      data: { bids, asks },
      latestTradePrice,
    } = this.props;
    const { highlightRow, selectedPrice } = this.state;
    const fairMarketPrice = `${latestTradePrice} ${CRYPTO_VIEW.CURRENCY}`;

    return (
      <>
        {/* CHECK think I have bids and asks backwards! */}
        {selectedPrice && (
          <h2>
            {selectedPrice} {CRYPTO_VIEW.CURRENCY}
          </h2>
        )}
        <List
          type={bid}
          data={asks}
          updateHoverState={this.updateHoverState}
          selectPrice={this.selectPrice}
          highlightRow={highlightRow}
        />
        <MarketPrice price={fairMarketPrice} />
        <List
          type={ask}
          data={bids}
          updateHoverState={this.updateHoverState}
          selectPrice={this.selectPrice}
          highlightRow={highlightRow}
        />
      </>
    );
  }
}

OrderBook.propTypes = {
  data: PropTypes.object.isRequired,
  latestTradePrice: PropTypes.string,
};

OrderBook.defaultProps = {
  latestTradePrice: '',
};

export default OrderBook;
