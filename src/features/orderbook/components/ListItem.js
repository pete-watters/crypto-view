import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { hover } from '../../../styles/_variables.scss';
// FIXME rename this now it's not a list item, actuall more a grid row
class ListItem extends PureComponent {
  onMouseEnter = () => {
    const { rowNumber, updateHoverState } = this.props;
    updateHoverState(rowNumber);
  };

  onMouseLeave = () => {
    const { updateHoverState } = this.props;
    updateHoverState('');
  };

  onClick = () => {
    const { price, selectPrice } = this.props;
    selectPrice(price);
  }

  render() {
    const { price, volume, cumulativeVolume, highlightRow, type } = this.props;
    const [matched, unique] = price;
    const [integral, decimal] = volume;
    const [cumulativeIntegral, cumulativeDecimal] = cumulativeVolume;
    return (
      <div
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onClick={this.onClick}
        onKeyPress={this.onClick}
        className={highlightRow ? hover : ''}
        role="button"
        tabIndex={0}
      >
        <span className={type}><em>{matched}</em>{unique}</span>
        <span>{integral}.<em>{decimal}</em></span>
        <span>{cumulativeIntegral}.<em>{cumulativeDecimal}</em></span>
      </div>);
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
};

export default ListItem;
