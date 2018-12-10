export default {
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
  togglePause({ dispatch, state }) {
    if (state.STATE === state.STATES.RUN ) {
      dispatch('pause');
    }
    else if (state.STATE === state.STATES.PAUSE ) {
      dispatch('resume');
    }
  },
};
