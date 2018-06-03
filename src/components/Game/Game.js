let knightPosition = [4, 3];
let observer = null;

function emitChange() {
  observer(knightPosition);
}

export function observe(o) {
  if (observer) {
    throw new Error('Multiple observers not implemented.');
  }

  observer = o;
  emitChange();
}

export function moveKnight(toX, toY) {
  knightPosition = [toX, toY];
  emitChange();
}

export function canMoveKnight(toX, toY) {  
    const [x, y] = knightPosition;
    const dx = toX - x;
    const dy = toY - y;
    const hasBall = true; // check the matrix later
    const noBallOnTarget = true; // check the matrix later

    const validMove = (Math.abs(dx) === 2 && Math.abs(dy) === 0) ||
                      (Math.abs(dx) === 0 && Math.abs(dy) === 2);

    return validMove && hasBall && noBallOnTarget;
  }