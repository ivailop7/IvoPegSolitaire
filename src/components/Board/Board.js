import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import { default as TouchBackend } from 'react-dnd-touch-backend';
import PropTypes from 'prop-types';
import BoardSquare from '../BoardSquare/BoardSquare';
import Ball from '../Ball/Ball';
import { canMoveKnight, moveKnight } from '../Game/Game';
import { BOARD_SIZE } from '../../Constants';

class Board extends Component {
    state = {
      board: null
    }

    componentWillMount() {
      this.generateEmptyBoard(BOARD_SIZE);
    }

    generateEmptyBoard(size) {
      const repeat = (fn, n) => Array(n).fill(0).map(fn);
      const rand = () => 0;
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
      this.setState({board: board})
    }

    renderSquares() {
      const board = this.state.board;
      let grid = [];
      for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board.length; y++) {
          const squareNum = board[x][y];
          grid.push( 
            <div key={'square'.concat(x,y) }
              style={{ width: '40px', height: '40px' }}>
                <BoardSquare x={x} y={y} squareNum={squareNum} color={squareNum === 1}>
                  {this.renderPiece(x,y)}
                </BoardSquare>
            </div>)
        }
      }
      return grid;
    }

    // renderSquare(i) {
    //     const x = i % 8;
    //     const y = Math.floor(i / 8);

    //     return (
    //         <div key={i}
    //             style={{ width: '40px', height: '40px' }}>
    //             <BoardSquare x={x} y={y}>
    //               {this.renderPiece(x,y)}
    //             </BoardSquare>
    //         </div>
    //     );
    // }

    renderPiece(x, y) {
        const [knightX, knightY] = this.props.knightPosition;
        if (x === knightX && y === knightY) {
          return <Ball />;
        }
      }

    handleSquareClick(toX, toY) {
        if (canMoveKnight(toX, toY)) {
            moveKnight(toX, toY);
        }
    }

  render() {
    console.log(this.state.board);
    
    // const squares = [];
    // for (let i = 0; i < 64; i++) {
    //   squares.push(this.renderSquare(i));
    // }

    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap'
      }}>
        {/* {squares}  */}
        { this.renderSquares() }
      </div>
    );
  }
}

Board.propTypes = {
  knightPosition: PropTypes.arrayOf(
    PropTypes.number.isRequired
  ).isRequired
};

export default DragDropContext(TouchBackend({ enableMouseEvents: true }))(Board);