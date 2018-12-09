import mutations from '@/store/mutations';

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