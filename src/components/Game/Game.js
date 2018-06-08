let ballPosition = [4, 3];
let observer = null;

function emitChange() {
  observer(ballPosition);
}

export function observe(o) {
  if (observer) {
    throw new Error('Multiple observers not implemented.');
  }

  observer = o;
  emitChange();
}

export function moveBall(toX, toY) {
  ballPosition = [toX, toY];
  emitChange();
}

export function canMoveBall(toX, toY) {
    const [x, y] = ballPosition;
    const dx = toX - x;
    const dy = toY - y;
    const hasBall = true; // check the matrix later
    const noBallOnTarget = true; // check the matrix later

    const validMove = (Math.abs(dx) === 2 && Math.abs(dy) === 0) ||
                      (Math.abs(dx) === 0 && Math.abs(dy) === 2);

    return validMove && hasBall && noBallOnTarget;
}