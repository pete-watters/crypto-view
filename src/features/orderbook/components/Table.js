import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { formatPrice, formatVolume, getRowNumber} from '../helpers';
import TableRow from './TableRow';

const Table = ({ type, data, updateHoverState, highlightRow, selectPrice }) =>
  <article>
    {data.map(([price, amount, cumulativeAmount], index, array) => {
      const rowNumber = getRowNumber(type, index, data);
      return (<TableRow
        key={`${price}-${amount}`}
        price={formatPrice(price, index, array)}
        type={type}
        amount={formatVolume(amount)}
        cumulativeAmount={formatVolume(cumulativeAmount)}
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
