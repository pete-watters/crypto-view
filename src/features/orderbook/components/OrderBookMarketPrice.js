import React from 'react';
import PropTypes from 'prop-types';

const OrderBookMarketPrice = ({ price }) =>
  <article className="orderbook-fairmarket-price">
    <h3>{price}</h3>
  </article>;

OrderBookMarketPrice.propTypes = {
  price: PropTypes.string.isRequired,
};

export default OrderBookMarketPrice;