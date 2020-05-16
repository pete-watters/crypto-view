import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class ListItem extends PureComponent {
  onMouseEnter = () => {
    const { rowNumber, updateHoverState} = this.props;
    updateHoverState(rowNumber);
  };

  onMouseLeave = () => {
      const { updateHoverState} = this.props;
      updateHoverState('');
  };
  onClick = () => {
    const { price, selectPrice } = this.props;
    selectPrice(price);
  }

  render(){
    const { price, volume, cumulativeVolume, highlightRow } = this.props;
    const [ matched, unique ] = price;
    const [integral, decimal] = volume;
    const [cumulativeIntegral, cumulativeDecimal] = cumulativeVolume;    
    // TODO this could be more generic I guess? 
    // abstract logic for this specific case and refactor to be a generic li item
    return (
    <li
      onMouseEnter={this.onMouseEnter}
      onMouseLeave={this.onMouseLeave}
      onClick={this.onClick}
      className={highlightRow && 'hover'}
    >
        <span className='price'><em>{matched}</em>{unique}</span>
        <span>{integral}.<em>{decimal}</em></span>
        <span>{cumulativeIntegral}.<em>{cumulativeDecimal}</em></span>
    </li>);
  }
}
 

ListItem.propTypes = {
  rowNumber: PropTypes.string.isRequired,
  highlightRow: PropTypes.bool,
  type: PropTypes.string.isRequired,
  price: PropTypes.array.isRequired,
  volume: PropTypes.array.isRequired,
  cumulativeVolume: PropTypes.array.isRequired,
  updateHoverState: PropTypes.func.isRequired,
  selectPrice: PropTypes.func.isRequired,
};

ListItem.defaultProps = {
  highlightRow: null,
}

export default ListItem;