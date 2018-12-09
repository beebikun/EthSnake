
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
  idxBelow(state) {
    return (idx) => {
      const { x, y } = getMatrixPos(idx);
      const next = matrixToIdx(x, y + 1);
      return next >= state.SIZE.count ? null : next;
    };
  }
};


function getRandom(max) {
  return Math.floor(Math.random() * max);
}
