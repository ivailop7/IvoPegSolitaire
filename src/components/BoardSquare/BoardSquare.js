import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from '../../Constants';
import { canMoveBall, moveBall } from '../Game/Game';
import Tile from '../Tile/Tile';

const squareTarget = {
  canDrop(props, monitor) {
    const item = monitor.getItem();    
    return canMoveBall(item.startX, item.startY, props.x, props.y, item.matrix);
  },

  drop(props, monitor) {
    const item = monitor.getItem();
    moveBall(item.startX, item.startY, props.x, props.y, item.matrix, item.id);

    return { moved: true,
             endX: props.x,
             endY: props.y 
    };
  }
};

function collect(connect, monitor) {
  return {
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    isOverCurrent: monitor.isOver({ shallow: true }), //Optional
    itemType: monitor.getItemType(), //Optional
    connectDropTarget: connect.dropTarget()
  };
}

class BoardSquare extends Component {
  
  renderOverlay(color) {
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 1,
        opacity: 0.5,
        backgroundColor: color,
        borderRadius: '50px',
      }} />
    );
  }

  render() {
    const { connectDropTarget, isOver, canDrop, tileStyle } = this.props;

    return connectDropTarget(
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}>
        <Tile tileStyle={tileStyle}>
          {this.props.children}
        </Tile>
        {!isOver && canDrop && this.renderOverlay('yellow')}
        {isOver && canDrop && this.renderOverlay('green')}
      </div>
    );
  }
}

export default DropTarget(ItemTypes.BALL, squareTarget, collect)(BoardSquare);