import Vue from 'vue';

export default {
  addBlock (state, block) {
    state.blocks.push(block);
  },
  clearBlocks(state) {
    Vue.set(state, 'blocks', []);
  },
  addStats (state, block) {
    collectStats(state.STATS_KEYS, 'blocksStats', block);

    const transactionsLength = block.transactions.length;
    checkRange('blocksStats', 'transactions', transactionsLength);
    checkRange('blocksStats', 'transactions', transactionsLength);

    block.transactions.forEach((transaction) => {
      collectStats(state.TRANS_STATS_KEYS, 'transStats', transaction);
    });

    function checkRange(statsName, name, value) {
      _check('min', Math.min);
      _check('max', Math.max);

      function _check(key, fn) {
        const old = state[statsName][name][key];
        Vue.set(state[statsName][name], key, fn(old, value));
      }
    }

    function collectStats(fields, statsName, item) {
      fields.forEach((name) => {
        checkRange(statsName, name, item[name]);
      });
    }
  },
  setEth (state, eth) {
    Vue.set(state, 'eth', eth);
  },
  showTransactions(state, idx) {
    Vue.set(state, 'showTransactionsIdx', idx);
  }
};
