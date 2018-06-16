import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import { default as TouchBackend } from 'react-dnd-touch-backend';
import { BOARD_SIZE } from '../../Constants';
import Ball from '../Ball/Ball';
import BoardSquare from '../BoardSquare/BoardSquare';
import Footer from '../Footer/Footer';
import { anyValidMovesLeft, canMoveBall, moveBall, pegsLeft } from '../Game/Game';
import GameOver from '../GameOver/GameOver';
import Header from '../Header/Header';
import classes from './Board.css';

class Board extends Component {
  state = {
    board: null
  }

  updateBoardAfterMove = this.updateBoardAfterMove.bind(this);
  generateEmptyBoard = this.generateEmptyBoard.bind(this);
  
  updateBoardAfterMove(updatedBoard) {
    this.setState({board: updatedBoard});
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
        board[i][j] = -1;
        board[i][size-j-1] = -1;
        board[size-i-1][j] = -1;
        board[size-i-1][size-j-1] = -1;
      }
    }

    //Populate the empty slot
    const middle = Math.round((size-1)/2, 0);
    board[middle][middle] = 0;
    this.setState({board: board});
  }

  generateTileStyle(x,y, squareNum) {
    let tileStyle = {
      backgroundColor: 'grey',
      color: 'grey',
      width: '100%',
      height: '100%',
      border: '1px solid #666666',
    };
    tileStyle.opacity = squareNum < 0 ? 0 : 1;

    const radius = '10px';
    //top left
    if((x===2 && y===0) || (x===0 && y===2)) {
      tileStyle.borderRadius = `${radius} 0 0 0`;
    }
    // top right
    else if((x===0 && y===4) || (x===2 && y===6)) {
      tileStyle.borderRadius = `0 ${radius} 0 0`;
    }
    // bottom right
    else if((x===6 && y===4) || (x===4 && y===6)) {
      tileStyle.borderRadius = `0 0 ${radius} 0`;
    }
    // bottom left
    else if((x===6 && y===2) || (x===4 && y===0)) {
      tileStyle.borderRadius = `0 0 0 ${radius}`;
    }
    return tileStyle;
  }

  renderSquares() {
    const board = this.state.board;
    let grid = [];
    for (let x = 0; x < board.length; x++) {
      for (let y = 0; y < board.length; y++) {
        const squareNum = board[x][y];
        grid.push( 
          <div key={'bsquare'.concat(x,y) } className={classes.Square} >
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
    if(squareNum === 2) return <Ball id={id} 
                                     x={x} 
                                     y={y} 
                                     matrix={matrix} 
                                     updateBoard={this.updateBoardAfterMove} />;
  }

  handleSquareClick(fromX, fromY, toX, toY, matrix, id) {
    if (canMoveBall(fromX, fromY, toX, toY, matrix, id)) {
        moveBall(fromX, fromY, toX, toY, matrix, id);
    }
  }

  render() {
    const pegsRemaining = pegsLeft(this.state.board);
    
    return (
      <div className={classes.hocBoard}>
      <Header/>
      {!anyValidMovesLeft(this.state.board) ?
      <GameOver text={pegsRemaining === 1 ? 
                      "You solved the game! You got a single peg left.":
                      "No Moves Left. You had only " + pegsRemaining + " pegs left."} 
                title={pegsRemaining === 1 ? "Congratulations!" : "Great game! You almost won!"}
                pegsLeft={pegsRemaining}
                resetGame={this.generateEmptyBoard}/> : null}
      <p/><p/><p/><p/>
        <div className={classes.Board}>
          { this.renderSquares() }
        </div>
      <Footer/>
      </div>
    );
  }
}

export default DragDropContext(TouchBackend({ enableMouseEvents: true }))(Board);