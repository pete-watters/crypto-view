import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { ask } from 'styles/_variables.scss';
import TableRow from './TableRow';

const getRowNumber = (rowType, index, rowData) =>
  (rowType === ask ? `${index + 1}` : `${rowData.length - index}`);

const Table = ({ type, data, updateHoverState, highlightRow, selectPrice }) =>
  <article>
    {data.map(([price, volume, cumulativeVolume], index) => {
      const rowNumber = getRowNumber(type, index, data);
      return (<TableRow
        key={`${price}-${volume}`}
        price={price}
        type={type}
        volume={volume}
        cumulativeVolume={cumulativeVolume}
        updateHoverState={updateHoverState}
        rowNumber={rowNumber}
        highlightRow={rowNumber === highlightRow}
        selectPrice={selectPrice}
      />
      );
    })
        }
  </article>;

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

export default memo(Table);
