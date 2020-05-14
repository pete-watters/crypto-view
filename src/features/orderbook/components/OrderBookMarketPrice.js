import React from 'react';
import PropTypes from 'prop-types';
// This seems a bit pointless now
// should change this to contain the aside
// compose it of two lists and fair trade section in center
// pass the li's to list as children
const OrderBookMarketPrice = ({ price }) =>
  <article className="orderbook-fairmarket-price">
    <h3>{price}</h3>
  </article>;

OrderBookMarketPrice.propTypes = {
  price: PropTypes.string.isRequired,
};

export default OrderBookMarketPrice;