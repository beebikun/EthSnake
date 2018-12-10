export default {
  drawSnake({ state, commit, dispatch, rootState }) {
    const gameIsRun = rootState.game.STATE === rootState.game.STATES.RUN;
    if (gameIsRun) {
      commit('addFrameCount');
      if (state.frameCount >= state.speed) {
        commit('flushFrameCount');
        dispatch('moveSnake');
      }
    }
    requestAnimationFrame(() => dispatch('drawSnake'));
  },

  moveSnake({ state, commit, dispatch, rootGetters }) {
    const currFirstBlockIdx = state.blocks[0].idx;
    const nextFirstBlockIdx = rootGetters.neightborIdx(currFirstBlockIdx, state.direction );
    const collision = nextFirstBlockIdx && state.blocks.find(isCollition);
    console.log(state.blocks.map(({idx}) => idx));
    console.log([ currFirstBlockIdx, nextFirstBlockIdx, state.direction, collision && collision.idx, state.speed ])
    if ( nextFirstBlockIdx === null || collision !== undefined ) {
      dispatch('gameover');
    } else {
      dispatch('collectTokens', nextFirstBlockIdx);

      const nextPositions = state.blocks.map((block, i) => {
        const prev = state.blocks[i - 1];
        const curr = state.blocks[i];
        const idx = prev ? prev.idx : nextFirstBlockIdx;
        return { ...curr, idx: idx.toString() };
      });

      commit('setSnake', nextPositions);
    }

    function isCollition({ idx }) {
      return idx === nextFirstBlockIdx;
    }
  },

  initSnake({ dispatch }) {
    dispatch('createSnake');
    dispatch('drawSnake');
  },

  createSnake({ dispatch, commit, state, rootState, rootGetters }) {
    dispatch('pause');
    commit('resetSpeed');
    commit('setDirection', state.INIT_DIRECTION);

    const startIdx = rootState.game.CENTER;
    const blocks = [];
    for (let i = 0; i < state.INIT_SIZE; i++) {
      const prev = blocks[ i - 1 ];
      const idx = prev ? rootGetters.neightborIdx(prev.idx, state.DIRECTIONS.DOWN) : startIdx;
      const id = 'snake:' + i;
      blocks.push({ idx: idx.toString(), id });
    }

    commit('setSnake', blocks);
  },

  setDirection({ commit, state, rootState }, name) {
    const { game } = rootState;
    // allow to change direction only during the active state
    if (game.STATE !== game.STATES.RUN) {
      return;
    }

    const newDirection = state.DIRECTIONS[name];
    if (!newDirection) return;

    const oldDirection = state.direction;
    const notPossibleChanges = {
      [ state.DIRECTIONS.UP ]    : state.DIRECTIONS.DOWN,
      [ state.DIRECTIONS.DOWN ]  : state.DIRECTIONS.UP,
      [ state.DIRECTIONS.RIGHT ] : state.DIRECTIONS.LEFT,
      [ state.DIRECTIONS.LEFT ]  : state.DIRECTIONS.RIGHT,
    };

    if ( newDirection === oldDirection ||
         notPossibleChanges[newDirection] === oldDirection ) return;

    commit('setDirection', name);
  },

  lvlupSnake({ state, commit }) {
    const blocks = state.blocks.concat({ id: 'snake:' + state.blocks.length });
    commit('speedup');
    commit('setSnake', blocks);
  }
};
