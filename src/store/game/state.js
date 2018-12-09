const SIZE = { w: 11, h: 11, side: 50 };
SIZE.count = SIZE.w * SIZE.h;


export default {
  SIZE: Object.freeze(SIZE),
  CENTER: matrixToIdx(Math.round(SIZE.w / 2), Math.round(SIZE.h / 2)),
  tiles: Array(SIZE.count).fill().map(getTile),
};

export function getMatrixPos(idx) {
  return { x: idx % SIZE.w, y: Math.floor(idx / SIZE.w) };
}

export function matrixToIdx(x, y) {
  return y * SIZE.w + x
}

function getTile(_, idx) {
  const size = SIZE.side;
  const matrixPos = getMatrixPos(idx);
  const style = {
    left: matrixPos.x * size + 'px',
    top: matrixPos.y * size + 'px',
    width: size + 'px',
    height: size + 'px',
  };
  return Object.freeze({
    style, matrixPos,
    id: 'tale_' + idx,
    idx: idx.toString(),
  });
}
