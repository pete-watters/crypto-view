import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = { hover: false };
  }
  onMouseEnter = () => {
    const { id, type, updateHoverState} = this.props;
    this.setHover(true);
    updateHoverState(id, type);
  };

  onMouseLeave = () => {
      const { id, type, clearHoverState} = this.props;
      this.setHover(false);
      clearHoverState(id, type);
  };
  setHover = hover => {
    this.setState({ hover });
  };

  render(){
    const { hover } = this.state;
    const { id, price, volume, cumulativeVolume, type } = this.props;
    const [integral, decimal] = volume;
    const [cumulativeIntegral, cumulativeDecimal] = cumulativeVolume;    

    return (
    <li
      id={id}
      onMouseEnter={this.onMouseEnter}
      onMouseLeave={this.onMouseLeave}
      className={hover ? 'hover' : ''}
    >
        <span className={`orderbook-price-${type}`}>{price} </span>
        <span>{integral}.<em>{decimal}</em></span>
        <span>{cumulativeIntegral}.<em>{cumulativeDecimal}</em></span>
      </li>);
  }
}
 

ListItem.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  volume: PropTypes.array.isRequired,
  cumulativeVolume: PropTypes.array.isRequired,
  updateHoverState: PropTypes.func.isRequired,
  clearHoverState: PropTypes.func.isRequired,
};

export default ListItem;