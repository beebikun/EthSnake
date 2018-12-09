import mutations from '@/store/game/snake/mutations';


it('addSnakeBlock', () => {
  const state = { blocks: [] };
  const block = { idx: 1 };

  mutations.addSnakeBlock(state, block);

  expect(state.blocks)
    .toEqual([block]);
});