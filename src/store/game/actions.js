export default {
  addToken({ getters, commit }, blockIdx) {
    const idx = getters.getFree;
    commit('addToken', { idx, blockIdx });
  },
  deleteToken({ commit }, idx) {
    commit('deleteToken', idx);
  },
};
