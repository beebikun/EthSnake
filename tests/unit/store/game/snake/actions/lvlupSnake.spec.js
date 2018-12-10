import actions from '@/store/game/snake/actions';

it('lvlupSnake', () => {
  const state = {
    blocks: [
      { id: 'snake:0', idx: 10 },
      { id: 'snake:1', idx: 20 },
    ],
  };
  const expectedBlocks = state.blocks.concat({ id: 'snake:2' });
  const commit = jest.fn();

  actions.lvlupSnake({ commit, state });

  expect(commit)
    .toHaveBeenNthCalledWith(1, 'speedup');
  expect(commit)
    .toHaveBeenNthCalledWith(2, 'setSnake', expectedBlocks);
});
