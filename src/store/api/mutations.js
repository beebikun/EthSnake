import Vue from 'vue';

export default {
  addBlock (state, block) {
    state.blocks.push(block);
  },
  setEth (state, eth) {
    Vue.set(state, 'eth', eth);
  }
};
