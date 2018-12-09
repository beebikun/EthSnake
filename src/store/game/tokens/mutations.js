import Vue from 'vue';

export default {
  addToken(state, { idx, blockIdx }) {
    Vue.set(state, idx, blockIdx);
  },
  deleteToken(state, idx) {
    Vue.delete(state, idx);
  },
};
