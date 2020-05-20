import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CRYPTO_VIEW } from 'constants';
import { bid, ask } from 'styles/_variables.scss';
import Table from './components/Table';
import MarketPrice from './components/MarketPrice';

class OrderBook extends PureComponent {
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
    // throw new Error('I crashed!'); // - TODO uncomment me to test error page
    const {
      data: { bids, asks },
      latestTradePrice,
    } = this.props;
    const { highlightRow, selectedPrice } = this.state;

    return (
      <>
        {selectedPrice && (
          <article>
            <h2>
              {selectedPrice} {CRYPTO_VIEW.CURRENCY}
            </h2>
          </article>
        )}
        <Table
          type={bid}
          data={asks}
          updateHoverState={this.updateHoverState}
          selectPrice={this.selectPrice}
          highlightRow={highlightRow}
        />
        {latestTradePrice && <MarketPrice price={`${latestTradePrice} ${CRYPTO_VIEW.CURRENCY}`} /> }
        <Table
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
  latestTradePrice: PropTypes.number,
};

OrderBook.defaultProps = {
  latestTradePrice: null,
};

export default OrderBook;
