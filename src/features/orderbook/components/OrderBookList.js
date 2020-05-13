import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';

class OrderBookList extends PureComponent {
  constructor () {
    super()
    this.state = {
      hover: ''
    }
    this.updateHoverState = this.updateHoverState.bind(this);
    this.clearHoverState = this.clearHoverState.bind(this);
  }

  updateHoverState (row, type) {
    this.setState({ hover: row });
    const opposite = type === 'bid' ? 'ask' : 'bid';
    document.getElementById(`${opposite}-${row.substr(-1)}`).className = 'hover';
  }

  clearHoverState(row, type){
    this.setState({ hover: '' });
    const opposite = type === 'bid' ? 'ask' : 'bid';
    document.getElementById(`${opposite}-${row.substr(-1)}`).classList.remove('hover');
  }

render(){
  const { type, data } = this.props;

  const getId = (type, index) => 
    type === 'ask' ? `${type}-${index+1}` : `${type}-${data.length - index}`;
  

  const { hover } = this.state;
  console.log(hover);
  
  return (
    <>
    <h1>Hover: {this.state.hover}</h1>
    <ul className={`${type}-list`}>
      {data.map(([price, volume, cumulativeVolume], index) => {
      const id = getId(type, index);
      const mirrorHover = hover.substr(-1) ===  id.substr(-1);
      console.log(mirrorHover); 

      return(
      <ListItem
          id={id}
          key={index+1}
          price={price}
          type={type}
          volume={volume}
          // className={hover.substr(-1) ===  id ? 'hover' : ''}
          cumulativeVolume={cumulativeVolume} 
          updateHoverState={this.updateHoverState}
          clearHoverState={this.clearHoverState}
        />);
       
      }
        )}
      </ul>
    </>);
}
}
  

OrderBookList.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default OrderBookList;