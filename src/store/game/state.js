const SIZE = { w: 8, h: 8, side: 64 };
SIZE.count = SIZE.w * SIZE.h;

export default {
  SIZE: Object.freeze(SIZE),
  tiles: Array(SIZE.count).fill().map(getTile),
  tokens: {},
};


function getTile(_, idx) {
  const size = SIZE.side;
  const matrixPos = { x: idx % SIZE.w, y: Math.floor(idx / SIZE.w) };
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
