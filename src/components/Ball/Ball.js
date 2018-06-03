import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ItemTypes } from '../../Constants';
import { DragSource } from 'react-dnd';
import blueBall from './blue_ball.png';
import classes from './Ball.css'

const knightSource = {
    beginDrag(props) {
      return {};
    }
  };

function collect(connect, monitor) {
    return {
      connectDragSource: connect.dragSource(),
      connectDragPreview: connect.dragPreview(), // Optional
      isDragging: monitor.isDragging()
    }
}

class Ball extends Component {
    
    render() {
      const { connectDragSource, isDragging } = this.props;
      return connectDragSource(
          <div style={{
            opacity: isDragging ? 0.5 : 1,
            fontSize: 25,
            fontWeight: 'bold',
            cursor: 'move'
          }}>
          <div className={classes.centeringDiv}>
            <img src={blueBall} className={classes.Ball} alt=''/>
          </div>
        </div>
      );
    }
  }
  
  Ball.propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  };
  
  export default DragSource(ItemTypes.BALL, knightSource, collect)(Ball);