import Vue from 'vue';

export default {
  addBlock (state, block) {
    state.blocks.push(block);
  },
  clearBlocks(state) {
    Vue.set(state, 'blocks', []);
  },
  addStats (state, block) {
    state.STATS_KEYS.forEach((name) => {
      const value = block[name];
      checkRange(name, value, 'min', Math.min);
      checkRange(name, value, 'max', Math.max);
    });

    const transactions = block.transactions.length;
    checkRange('transactions', transactions, 'min', Math.min);
    checkRange('transactions', transactions, 'max', Math.max);

    function checkRange(name, value, key, fn) {
      const old = state.blocksStats[name][key];
      Vue.set(state.blocksStats[name], key, fn(old, value));
    }

  },
  setEth (state, eth) {
    Vue.set(state, 'eth', eth);
  },
  showTransactions(state, idx) {
    console.log('showTransactions', idx)
    Vue.set(state, 'showTransactionsIdx', idx);
  }
};
