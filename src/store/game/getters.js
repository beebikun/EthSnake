export default {
  getFree(state) {
    const free = state.tiles
      .filter(({ idx }) => state.tokens[idx] === undefined );
    const n = getRandom(free.length);
    return free[n].idx;
  },
};


function getRandom(max) {
  return Math.floor(Math.random() * max);
}