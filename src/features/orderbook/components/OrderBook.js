import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { OrderBookList, OrderBookMarketPrice } from '../index';
import { CRYPTO_VIEW } from '../../../constants';

class OrderBook extends Component {
  constructor () {
    super()
    this.state = {
      hover: '',
      selectedPrice: '',
    }
    this.selectPrice = this.selectPrice.bind(this);
    this.updateHoverState = this.updateHoverState.bind(this);
  }

  selectPrice (price) {
    this.setState({ selectedPrice: price });
  }
  updateHoverState (row) {
    this.setState({ highlightRow: row });
  }

  render(){
    const { data: { bids, asks } } = this.props;
    const { highlightRow, selectedPrice } = this.state;

    return(
      <aside className="orderbook">
      {/* CHECK think I have bids and asks backwards! */}
      {selectedPrice && <h2>{selectedPrice} {CRYPTO_VIEW.CURRENCY}</h2>}
      <OrderBookList
        type={CRYPTO_VIEW.ORDER_TYPES.ASK}
        data={asks}
        updateHoverState={this.updateHoverState}
        selectPrice={this.selectPrice}
        highlightRow={highlightRow}
      />
      <OrderBookMarketPrice price={`1,000 ${CRYPTO_VIEW.CURRENCY}`} />
      <OrderBookList
        type={CRYPTO_VIEW.ORDER_TYPES.BID}
        data={bids}
        updateHoverState={this.updateHoverState}
        selectPrice={this.selectPrice}
        highlightRow={highlightRow}
      />
      </aside>);
  }
}
  
OrderBook.propTypes = {
  data: PropTypes.object.isRequired,
  error: PropTypes.bool,
  loading: PropTypes.bool,
};

OrderBook.defaultProps = {
  error: false,
  loading: null,
};

export default OrderBook;