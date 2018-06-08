import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import { default as TouchBackend } from 'react-dnd-touch-backend';
import BoardSquare from '../BoardSquare/BoardSquare';
import Ball from '../Ball/Ball';
import { canMoveBall, moveBall } from '../Game/Game';
import { BOARD_SIZE } from '../../Constants';

class Board extends Component {
  state = {
    board: null
  }

  componentWillMount() {
    this.generateEmptyBoard(BOARD_SIZE);
  }

  generateEmptyBoard(size) {
    // 1 - Unreachable, 2 - Ball, 0 - Movable
    // Populate the balls
    const repeat = (fn, n) => Array(n).fill(2).map(fn);
    const rand = () => 2;
    const puzzle = n => repeat(() => repeat(rand, n), n);
    const board = puzzle(size);

    // Populate untouchable area
    for(let i = 0; i < size/3 - 1; i++) {
      for(let j = 0; j < size/3 - 1; j++) {
        board[i][j] = 1;
        board[i][size-j-1] = 1;
        board[size-i-1][j] = 1;
        board[size-i-1][size-j-1] = 1;
      }
    }

    //Populate the empty slot
    const middle = Math.round((size-1)/2, 0);
    board[middle][middle] = 0;
    this.setState({board: board})
  }

  renderSquares() {
    const board = this.state.board;
    let grid = [];
    for (let x = 0; x < board.length; x++) {
      for (let y = 0; y < board.length; y++) {
        const squareNum = board[x][y];
        grid.push( 
          <div key={'bsquare'.concat(x,y) } 
                style={{ width: '40px', height: '40px' }} >
              <BoardSquare key={'bsquare'.concat(x,y)}
                            x={x} 
                            y={y} 
                            squareNum={squareNum} 
                            color={squareNum !== 1} >
                {this.renderBall(x, y, squareNum, 'ball'.concat(x,y))}
              </BoardSquare>
          </div>)
      }
    }
    return grid;
  }

  renderBall(x, y, squareNum, id) {
    if(squareNum === 2) return <Ball id={id} x={x} y={y}/>;
  }

  handleSquareClick(toX, toY) {
    if (canMoveBall(toX, toY)) {
        moveBall(toX, toY);
    }
  }

  updateBoardAfterMove() {

  }
  render() {
    console.log(this.state.board);
    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap'
      }}>
        { this.renderSquares() }
      </div>
    );
  }
}

export default DragDropContext(TouchBackend({ enableMouseEvents: true }))(Board);