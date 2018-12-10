export default {
  addToken({ rootGetters, commit }, blockIdx) {
    const idx = rootGetters.getFree;
    commit('addToken', { idx, blockIdx });
  },
  deleteToken({ commit }, idx) {
    commit('deleteToken', idx);
  },
  collectTokens({ dispatch, state }, idx) {
    if (state[idx]) {
      dispatch('deleteToken', idx);
    }
  },
};
