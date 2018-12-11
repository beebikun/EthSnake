export default {
  setEth({ commit, dispatch, state }, eth) {
    if (state.eth) {
      // do not set eth twice (prevent bugs for vue dev serve)
      return;
    }
    commit('setEth', eth);

    dispatch('fetchBlocks');
  },

  addBlock ({ commit, dispatch }, { block, idx }) {
    block.id = `block_${ idx }`;
    block.idx = idx;
    commit('addBlock', block);
    commit('addStats', block);

    dispatch('addToken', block.idx);
  },

  async fetchBlocks({ commit, dispatch, state }) {
    dispatch('showTransactions', null);
    commit('clearBlocks');

    const { eth, LOAD_BLOCKS_COUNT } = state;

    const latest = await eth.getBlockNumber();
    const batch = new eth.BatchRequest();

    for (let idx = 0; idx < LOAD_BLOCKS_COUNT; idx++) {
      const blockNumber = latest - idx;
      const getBlock = eth.getBlock.request(blockNumber, true, (_, block) => {
        if (block) {
          dispatch('addBlock', { block, idx });
        }
      });
      batch.add(getBlock);
    }

    await batch.execute();
    dispatch('resume');
  },

  showTransactions({ commit }, idx) {
    commit('showTransactions', idx);
  },
};
