export default {
  drawSnake({ state, dispatch }) {
    if (state.blocks.length === 0) {
      dispatch('initSnake');
    } else {
      // dispatch('moveSnake')
    }
    // requestAnimFrame(() => dispatch('drawSnake'))
  },

  // moveSnake() {},

  initSnake({ commit, dispatch, rootState, state, rootGetters }) {
    const startIdx = rootState.game.CENTER;

    for (let i = 0; i < state.INIT_SIZE; i++) {
      const prev = state.blocks[ i - 1 ];
      const idx = prev ? rootGetters.idxBelow(prev.idx) : startIdx;
      const id = 'snake:' + i;

      commit('addSnakeBlock', { idx: idx.toString(), id });
    }


    dispatch('drawSnake');
  },
};
