import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ask } from 'styles/_variables.scss';
import TableRow from './TableRow';

class Table extends PureComponent {
  render() {
    const { type, data, updateHoverState, highlightRow, selectPrice } = this.props;
    // FIXME refactor this
    const getRowNumber = (rowType, index) =>
      (rowType === ask ? `${index + 1}` : `${data.length - index}`);

    return (
      <article>
        {data.map(([price, volume, cumulativeVolume], index) => (
          <TableRow
            key={`${price}-${volume}`}
            price={price}
            type={type}
            volume={volume}
            cumulativeVolume={cumulativeVolume}
            updateHoverState={updateHoverState}
            rowNumber={getRowNumber(type, index)}
            highlightRow={getRowNumber(type, index) === highlightRow}
            selectPrice={selectPrice}
          />
        ))
        }
      </article>
    );
  }
}

Table.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  updateHoverState: PropTypes.func.isRequired,
  selectPrice: PropTypes.func.isRequired,
  highlightRow: PropTypes.string,
};

Table.defaultProps = {
  highlightRow: null,
};

export default Table;
