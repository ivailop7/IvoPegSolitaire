import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import blueBall from '../../assets/pixel_ball.png';
import { ItemTypes } from '../../Constants';
import classes from '../Board/Board.css';

const ballSource = {
  // Return the data describing the dragged item (required)
  beginDrag(props, monitor, component) {
    const item = { id: props.id,
                   startX: props.x,
                   startY: props.y,
                   matrix: props.matrix,
                   updateBoard: props.updateBoard};
    return item;
  },

  // Middle State
  isDragging(props, monitor) {
    return monitor.getItem().id === props.id;
  },

  // Final State
  endDrag(props, monitor, component) {
    // Dropped on an incompatible target
    if (!monitor.didDrop()) return;

    // Dropped on a compatible target
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    const dx = dropResult.endX - item.startX;
    const dy = dropResult.endY - item.startY;
    
    if(dx === 2)  item.matrix[dropResult.endX - 1][dropResult.endY] = 0;
    if(dx === -2) item.matrix[dropResult.endX + 1][dropResult.endY] = 0;
    if(dy === 2)  item.matrix[dropResult.endX][dropResult.endY-1] = 0;
    if(dy === -2) item.matrix[dropResult.endX][dropResult.endY+1] = 0;
    item.matrix[item.startX][item.startY] = 0;
    item.matrix[dropResult.endX][dropResult.endY] = 2;
    item.updateBoard(item.matrix);
  }
};

// Specifies which props to inject into your component.
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
          paddingTop: "10px",
          paddingLeft: "10px",
          opacity: isDragging ? 0.5 : 1,
          cursor: 'move',
          transition: '.2s linear',
        }}>
        <img src={blueBall} className={classes.Ball} alt={id}/>
        <div>
          {isDragging}
        </div>
      </div>
    );
  }
}
  
export default DragSource(ItemTypes.BALL, ballSource, collect)(Ball);