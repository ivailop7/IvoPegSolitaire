import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import { default as TouchBackend } from 'react-dnd-touch-backend';
import BoardSquare from '../BoardSquare/BoardSquare';
import Ball from '../Ball/Ball';
import { canMoveBall, moveBall } from '../Game/Game';
import { BOARD_SIZE } from '../../Constants';
import classes from './Board.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

class Board extends Component {
  state = {
    board: null
  }
  // constructor(props) {
  //   super(props)
    updateBoardAfterMove = this.updateBoardAfterMove.bind(this);
  // }

  updateBoardAfterMove(updatedBoard) {
    this.setState({board: updatedBoard});
  }

  // handler(e) {
  //   e.preventDefault();
  //   this.setState({
  //     board: 111;
  //   });
  // }
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
        board[i][j] = -1;
        board[i][size-j-1] = -1;
        board[size-i-1][j] = -1;
        board[size-i-1][size-j-1] = -1;
      }
    }

    //Populate the empty slot
    const middle = Math.round((size-1)/2, 0);
    board[middle][middle] = 0;
    this.setState({board: board})
  }

  generateTileStyle(x,y, squareNum) {
    let tileStyle;
    if (squareNum < 0) {
      tileStyle = {
        backgroundColor: 'grey',
        opacity: 0,
        color: 'grey',
        width: '100%',
        height: '100%',
        border: 0
      }
    }
    if (squareNum === 0) {
      tileStyle = {
        backgroundColor: 'grey',
        opacity: 1,
        color: 'grey',
        width: '100%',
        height: '100%',
        border: 0
      }
    }
    if (squareNum > 0) {
      tileStyle = {
        backgroundColor: 'grey',
        opacity: 1,
        color: 'grey',
        width: '100%',
        height: '100%',
        border: 0
      }
    }
    const radius = '10px';
    //harcoded, dynamize later
    //top left
    if((x===2 && y===0) || (x===0 && y===2)) {
      // tileStyle.border = '1px solid #333';
      tileStyle.borderRadius = `${radius} 0 0 0`;
    }
    // top right
    else if((x===0 && y===4) || (x===2 && y===6)) {
      // tileStyle.border = '1px solid #333';
      tileStyle.borderRadius = `0 ${radius} 0 0`;
    }
    // bottom right
    else if((x===6 && y===4) || (x===4 && y===6)) {
      // tileStyle.border = '1px solid #333';
      tileStyle.borderRadius = `0 0 ${radius} 0`;
    }
    // bottom left
    else if((x===6 && y===2) || (x===4 && y===0)) {
      // tileStyle.border = '1px solid #333';
      tileStyle.borderRadius = `0 0 0 ${radius}`;
    }
    // tileStyle.boxShadow = '2px 2px 2px #333';

    return tileStyle;
    
  }

  renderSquares() {
    const board = this.state.board;
    let grid = [];
    for (let x = 0; x < board.length; x++) {
      for (let y = 0; y < board.length; y++) {
        const squareNum = board[x][y];
        grid.push( 
          <div key={'bsquare'.concat(x,y) } 
                className={classes.Square} >
              <BoardSquare key={'bsquare'.concat(x,y)}
                            x={x}
                            y={y}
                            squareNum={squareNum}
                            tileStyle={this.generateTileStyle(x,y, squareNum)} >
                {this.renderBall(x, y, squareNum, 'ball'.concat(x,y), board)}
              </BoardSquare>
          </div>)
      }
    }
    return grid;
  }

  renderBall(x, y, squareNum, id, matrix) {
    if(squareNum === 2) return <Ball id={id} x={x} y={y} matrix={matrix} updateBoard={this.updateBoardAfterMove}/>;
  }

  handleSquareClick(fromX, fromY, toX, toY, matrix, id) {
    if (canMoveBall(fromX, fromY, toX, toY, matrix, id)) {
        moveBall(fromX, fromY, toX, toY, matrix, id);
    }
  }

  render() {
    console.log(this.state.board);
    return (
      <div className={classes.hocBoard}>
      <Header/>
      <br/><br/><br/><br/><br/><br/>
        <div className={classes.Board}>
          { this.renderSquares() }
        </div>
      <Footer/>
      </div>
    );
  }
}

export default DragDropContext(TouchBackend({ enableMouseEvents: true }))(Board);