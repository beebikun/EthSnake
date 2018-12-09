import mutations from '@/store/api/mutations';

it('set eth', () => {
  // mock state
  const state = { eth: null };
  const eth = { hello: 'there' };
  // apply mutation
  mutations.setEth(state, eth);
  // assert result
  expect(state.eth)
    .toEqual(eth);
});

it('add block', () => {
  // mock state
  const state = { blocks: [] };
  const block = { number: 1 };
  // apply mutation
  mutations.addBlock(state, block);
  // assert result
  expect(state.blocks)
    .toEqual([block]);
});
