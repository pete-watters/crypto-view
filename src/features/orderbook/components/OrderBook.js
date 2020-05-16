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
    const { data: { bids, asks }, latestTradePrice } = this.props;
    const { highlightRow, selectedPrice } = this.state;
    const fairMarketPrice = `${latestTradePrice} ${CRYPTO_VIEW.CURRENCY}`;

    return(
      <>
      {/* CHECK think I have bids and asks backwards! */}
      {selectedPrice && <h2>{selectedPrice} {CRYPTO_VIEW.CURRENCY}</h2>}
      <OrderBookList
        type={CRYPTO_VIEW.ORDER_TYPES.ASK}
        data={asks}
        updateHoverState={this.updateHoverState}
        selectPrice={this.selectPrice}
        highlightRow={highlightRow}
      />
      <OrderBookMarketPrice price={fairMarketPrice} />
      <OrderBookList
        type={CRYPTO_VIEW.ORDER_TYPES.BID}
        data={bids}
        updateHoverState={this.updateHoverState}
        selectPrice={this.selectPrice}
        highlightRow={highlightRow}
      />
      </>);
  }
}
  
OrderBook.propTypes = {
  data: PropTypes.object.isRequired,
  latestTradePrice: PropTypes.string,
  error: PropTypes.bool,
  loading: PropTypes.bool,
};

OrderBook.defaultProps = {
  latestTradePrice: '',
  error: false,
  loading: null,
};

export default OrderBook;