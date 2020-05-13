import React from 'react';
import PropTypes from 'prop-types';

const OrderBook = ({ children }) =>
  <aside className="orderbook-container">
    {children}
  </aside>;

OrderBook.propTypes = {
  children: PropTypes.array.isRequired,
  error: PropTypes.bool,
  loading: PropTypes.bool,
};

OrderBook.defaultProps = {
  error: false,
  loading: null,
};

export default OrderBook;