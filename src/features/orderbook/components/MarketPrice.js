import React from 'react';
import PropTypes from 'prop-types';

const MarketPrice = ({ price }) => (
  <article className="orderbook-fairmarket-price">
    <h3>{price}</h3>
  </article>
);

MarketPrice.propTypes = {
  price: PropTypes.string.isRequired,
};

export default MarketPrice;
