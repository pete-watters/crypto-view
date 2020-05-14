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

  render(){
    const { price, volume, cumulativeVolume, highlightRow } = this.props;
    const [integral, decimal] = volume;
    const [cumulativeIntegral, cumulativeDecimal] = cumulativeVolume;    

    return (
    <li
      onMouseEnter={this.onMouseEnter}
      onMouseLeave={this.onMouseLeave}
      className={highlightRow ? 'hover' : ''}
    >
        <span className='price'>{price}</span>
        <span>{integral}.<em>{decimal}</em></span>
        <span>{cumulativeIntegral}.<em>{cumulativeDecimal}</em></span>
    </li>);
  }
}
 

ListItem.propTypes = {
  rowNumber: PropTypes.string.isRequired,
  highlightRow: PropTypes.bool,
  type: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  volume: PropTypes.array.isRequired,
  cumulativeVolume: PropTypes.array.isRequired,
  updateHoverState: PropTypes.func.isRequired,
};

ListItem.defaultProps = {
  highlightRow: null,
}

export default ListItem;