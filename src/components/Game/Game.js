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
    // console.log("maa", matrix);
    const dx = toX - fromX;
    const dy = toY - fromY;
    const emptySlot = matrix[toX][toY] === 0;
    const jumpOverBall = true; //fix up later
    
    // console.log("dx:",dx,"dy:",dy);
    // console.log("toX:",toX,"toY:",toY);
    // console.log("fromX:",fromX,"fromY:",fromY);
    

    const validMove = (Math.abs(dx) === 2 && Math.abs(dy) === 0) ||
                      (Math.abs(dx) === 0 && Math.abs(dy) === 2);

    return validMove && emptySlot && jumpOverBall;
    // return false;
}