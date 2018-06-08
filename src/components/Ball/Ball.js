import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ItemTypes } from '../../Constants';
import { DragSource } from 'react-dnd';
import blueBall from './blue_ball.png';
import classes from './Ball.css'

const ballSource = {
  // Return the data describing the dragged item (required)
  beginDrag(props, monitor, component) {
    const item = { id: props.id,
                   startX: props.x,
                   startY: props.y};
    return item;
  },

  // Middle State
  isDragging(props, monitor) {
    // If your component gets unmounted while dragged
    // (like a card in Kanban board dragged between lists)
    // you can implement something like this to keep its
    // appearance dragged:
    return monitor.getItem().id === props.id;
  },

  // Final State
  endDrag(props, monitor, component) {
    // Dropped on a incompatible target
    if (!monitor.didDrop()) {
      console.log("Drop Failure");
      return;
    }

    // Dropped on a compatible target
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    console.log("droppedItem:", item);
    console.log("dropResult:", dropResult);
    //CardActions.moveCardToList(item.id, dropResult.listId);
  }
};
/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
    return {
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    }
}

class Ball extends Component {
  render() {
    const { id } = this.props;
    const { connectDragSource, isDragging } = this.props;
    return connectDragSource(
        <div style={{
          opacity: isDragging ? 0.5 : 1,
          fontSize: 25,
          fontWeight: 'bold',
          cursor: 'move'
        }}>
        <div className={classes.centeringDiv}>
          <img src={blueBall} className={classes.Ball} alt={ id }/>
          <div>
            {isDragging && ' (I am being dragged right now)'}
          </div>
        </div>
      </div>
    );
  }
}
  
export default DragSource(ItemTypes.BALL, ballSource, collect)(Ball);