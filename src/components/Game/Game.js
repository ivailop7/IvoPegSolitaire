let moveHappened = true;
let observer = null;

function emitChange() {
  observer(moveHappened);
}

export function observe(o) {
  if (observer) {
    throw new Error('Multiple observers not implemented.');
  }

  observer = o;
  emitChange();
}

export function moveBall(fromX, fromY, toX, toY, matrix, id) {
  console.log("moveBall:",fromX, fromY, toX, toY, matrix, id);
  
  moveHappened = true;
  emitChange();
}

export function canMoveBall(fromX, fromY, toX, toY, matrix, id) {
    if(!anyValidMovesLeft(matrix)) {
      let counter=0;
      for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
          if(matrix[i][j]===2) counter++;
        }
      }
      if(counter === 1) {
        //Show Material Dialoag with Share Result to FB/Twitter vs Start a new game.
        return alert("Congratulations! You solved the game!");
      }
      else {
        //Show Material Dialoag with Share Result to FB/Twitter vs Start a new game.
        return alert("No Moves Left. Congratulations! You had only " + counter + " balls left.");
      }
    }
    // console.log("maa", matrix);
    const dx = toX - fromX;
    const dy = toY - fromY;
    const emptySlot = matrix[toX][toY] === 0;
    
    // console.log("dx:",dx,"dy:",dy);
    // console.log("toX:",toX,"toY:",toY);
    // console.log("fromX:",fromX,"fromY:",fromY);

    const validMove = (dx === -2 && Math.abs(dy) === 0 && matrix[fromX-1][fromY] === 2) || 
                      (dx === 2 && Math.abs(dy)  === 0 && matrix[fromX+1][fromY] === 2) ||
                      (Math.abs(dx) === 0 && dy  === 2 && matrix[fromX][fromY+1] === 2) ||
                      (Math.abs(dx) === 0 && dy === -2 && matrix[fromX][fromY-1] === 2);

    return validMove && emptySlot;
    // return false;
}

export function anyValidMovesLeft(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      if(matrix[i][j]===2) {
        if(i-1>=0 && i-2>=0) {
          if(matrix[i-1][j]===2 && matrix[i-2][j]===0) return true;
        }
        if(i+1<matrix.length && i+2<matrix.length) {
          if(matrix[i+1][j]===2 && matrix[i+2][j]===0) return true;
        }
        if(j-1>=0 && j-2>=0) {
          if(matrix[i][j-1]===2 && matrix[i][j-2]===0) return true;
        }
        if(j+1<matrix.length && j+2<matrix.length) {
          if(matrix[i][j+1]===2 && matrix[i][j+2]===0) return true;
        }
      }
    }
  }
  return false;
}