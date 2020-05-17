import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ask } from 'styles/_variables.scss';
import ListItem from './ListItem';

class List extends PureComponent {
  render() {
    const { type, data, updateHoverState, highlightRow, selectPrice } = this.props;
    // FIXME refactor this
    const getRowNumber = (rowType, index) =>
      (rowType === ask ? `${index + 1}` : `${data.length - index}`);

    return (
      <>
        <ul>
          {data.map(([price, volume, cumulativeVolume], index) =>
            <li key={`${price}-${volume}`}>
              <ListItem
                price={price}
                type={type}
                volume={volume}
                cumulativeVolume={cumulativeVolume}
                updateHoverState={updateHoverState}
                rowNumber={getRowNumber(type, index)}
                highlightRow={getRowNumber(type, index) === highlightRow}
                selectPrice={selectPrice}
              />
            </li>)}
        </ul>
      </>);
  }
}

List.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  updateHoverState: PropTypes.func.isRequired,
  selectPrice: PropTypes.func.isRequired,
  highlightRow: PropTypes.string,
};

List.defaultProps = {
  highlightRow: null,
};

export default List;
