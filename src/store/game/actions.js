export default {
  run({ dispatch, state }, eth) {
    if (state.STATE === null) {
      dispatch('initSnake');
      dispatch('setEth', eth);
    }
  },
  rerun({ dispatch }) {
    console.log('RERUN');
    dispatch('createSnake');
    dispatch('fetchBlocks');
  },
  gameover({ commit, state }) {
    console.log('GAMEOVER');
    commit('changeGameState', state.STATES.GAMEOVER);
  },
  pause({ commit, state }) {
    console.log('PAUSE');
    commit('changeGameState', state.STATES.PAUSE);
  },
  resume({ commit, state }) {
    console.log('RESUME');
    commit('changeGameState', state.STATES.RUN);
  },
  switchGameState({ dispatch, state }) {
    switch(state.STATE) {
      case state.STATES.RUN:
        dispatch('pause');
        break;
      case state.STATES.PAUSE:
        dispatch('resume');
        break;
      case state.STATES.GAMEOVER:
        dispatch('rerun');
        break;
    }
  },
};
