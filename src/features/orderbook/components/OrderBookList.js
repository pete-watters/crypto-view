import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';

class OrderBookList extends PureComponent {
  
render(){
  const { type, data, updateHoverState, highlightRow, selectPrice } = this.props;

  const getRowNumber = (type, index) => 
    type === 'ask' ? `${index+1}` : `${data.length - index}`;
  
  return (
    <>
    <ul>
      {data.map(([price, volume, cumulativeVolume], index) => 
      <ListItem
          key={index+1}
          price={price}
          type={type}
          volume={volume}
          cumulativeVolume={cumulativeVolume} 
          updateHoverState={updateHoverState}
          rowNumber={getRowNumber(type, index)}
          highlightRow={getRowNumber(type, index) === highlightRow}
          selectPrice={selectPrice}
        />)}
      </ul>
    </>);
}
}
  

OrderBookList.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  updateHoverState: PropTypes.func.isRequired,
  selectPrice: PropTypes.func.isRequired,
  highlightRow: PropTypes.string,
};

OrderBookList.defaultProps = {
  highlightRow: null,
}

export default OrderBookList;