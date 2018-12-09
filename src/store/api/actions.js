export default {
  setEth({ commit, dispatch }, eth) {
    commit('setEth', eth);
    dispatch('fetchBlocks');
  },

  addBlock ({ commit, dispatch }, { block, idx }) {
    block.id = `block_${ idx }`;
    block.idx = idx;
    commit('addBlock', block);
    dispatch('addToken', block.idx.toString());
  },

  async fetchBlocks({ dispatch, state }) {
    const { eth, LOAD_BLOCKS_COUNT } = state;

    const latest = await eth.getBlockNumber();
    const batch = new eth.BatchRequest();

    for (let idx = 0; idx < LOAD_BLOCKS_COUNT; idx++) {
      const blockNumber = latest - idx;
      const getBlock = eth.getBlock.request(blockNumber, (_, block) => {
        dispatch('addBlock', { block, idx });
      });
      batch.add(getBlock);
    }

    batch.execute();
  }
};
