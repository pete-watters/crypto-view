import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { fairMarketPrice } from 'styles/main.scss';

const MarketPrice = ({ price }) => (
  <article className={fairMarketPrice}>
    <h3>{price}</h3>
  </article>
);

MarketPrice.propTypes = {
  price: PropTypes.string.isRequired,
};

export default memo(MarketPrice);
