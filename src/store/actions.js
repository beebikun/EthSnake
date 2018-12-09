export default {
  addBlock ({ commit }, block) {
    block.id = block.number || `pending_${ block.timestamp }`;
    commit('addBlock', block);
  },
};
