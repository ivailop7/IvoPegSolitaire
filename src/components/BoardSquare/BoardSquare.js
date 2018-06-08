import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tile from '../Tile/Tile';
import { canMoveBall, moveBall } from '../Game/Game';
import { ItemTypes } from '../../Constants';
import { DropTarget } from 'react-dnd';

const squareTarget = {
  canDrop(props, monitor) {
    const item = monitor.getItem();
    // return canMoveBall(item.id, item.startX, item.startY, props.x, props.y);
    return canMoveBall(props.x, props.y);
  },

  // hover(props, monitor, component) {
  //   // This is fired very often and lets you perform side effects
  //   // in response to the hover. You can't handle enter and leave
  //   // here—if you need them, put monitor.isOver() into collect() so you
  //   // can just use componentWillReceiveProps() to handle enter/leave.

  //   // You can access the coordinates if you need them
  //   const clientOffset = monitor.getClientOffset();
  //   const componentRect = findDOMNode(component).getBoundingClientRect();

  //   // You can check whether we're over a nested drop target
  //   const isJustOverThisOne = monitor.isOver({ shallow: true });

  //   // You will receive hover() even for items for which canDrop() is false
  //   const canDrop = monitor.canDrop();
  // },

  drop(props, monitor) {
    const item = monitor.getItem();
    console.log("drop props:", props);
    console.log("drop item:", item);
    moveBall(props.x, props.y);
    // moveBall(item.id, item.startX, item.startY, props.x, props.y);
    
    // You can also do nothing and return a drop result,
    // which will be available as monitor.getDropResult()
    // in the drag source's endDrag() method
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
  // Optional
  componentWillReceiveProps(nextProps) {
    if (!this.props.isOver && nextProps.isOver) {
      // You can use this as enter handler
    }

    if (this.props.isOver && !nextProps.isOver) {
      // You can use this as leave handler
    }

    if (this.props.isOverCurrent && !nextProps.isOverCurrent) {
      // You can be more specific and track enter/leave
      // shallowly, not including nested targets
    }
  }

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
      }} />
    );
  }

  render() {
    const { x, y, connectDropTarget, isOver, canDrop, squareNum, color } = this.props;
    const black = color;

    return connectDropTarget(
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}>
        <Tile black={black}>
          {this.props.children}
        </Tile>
        {isOver && !canDrop && this.renderOverlay('red')}
        {!isOver && canDrop && this.renderOverlay('yellow')}
        {isOver && canDrop && this.renderOverlay('green')}
      </div>
    );
  }
}

BoardSquare.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired
};

export default DropTarget(ItemTypes.BALL, squareTarget, collect)(BoardSquare);