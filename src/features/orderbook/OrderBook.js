import React from 'react';
import PropTypes from 'prop-types';
// This seems a bit pointless now
// should change this to contain the aside
// compose it of two lists and fair trade section in center
// pass the li's to list as children
const OrderBook = ({ children }) => 
  <ul>
  { children }
  </ul>;

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