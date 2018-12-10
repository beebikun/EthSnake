
import { getMatrixPos, matrixToIdx } from './state';

export default {
  getFree(state, getters, rootState) {
    const snake = rootState.game.snake.blocks.reduce((bucket, { idx }) => {
      bucket[idx] = true;
      return bucket;
    }, {});
    const tokens = rootState.game.tokens;
    const free = state.tiles
      .filter(({ idx }) => tokens[idx] === undefined && snake[idx] === undefined);
    const n = getRandom(free.length);
    return free[n].idx;
  },
  neightborIdx(state) {
    return (idx, direction) => {
      const { x, y } = getMatrixPos(idx);
      switch(direction) {
        case 'UP': {
          const next = matrixToIdx(x, y - 1);
          return next >= 0 ? next : null;
        }
        case 'DOWN': {
          const next = matrixToIdx(x, y + 1);
          return next < state.SIZE.count ? next : null;
        }
        case 'RIGHT': {
          const next = matrixToIdx(x + 1, y);
          return isOnOneLine(y, next) ? next : null;
        }
        case 'LEFT': {
          const next = matrixToIdx(x - 1, y);
          return isOnOneLine(y, next) ? next : null;
        }
      }

      function isOnOneLine(currY, next) {
        const nextPos = getMatrixPos(next);
        return nextPos.y === currY;
      }
    };
  }
};


function getRandom(max) {
  return Math.floor(Math.random() * max);
}
