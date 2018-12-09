import actions from '@/store/game/snake/actions';


it('initSnake', () => {
  const state = { INIT_SIZE: 2, blocks: [] };
  const commit = jest.fn((name, block) => {
    expect(name)
      .toEqual('addSnakeBlock');
    state.blocks.push(block);
  });
  const dispatch = jest.fn();
  const rootGetters = {
    idxBelow: jest.fn()
      .mockReturnValueOnce(20),
  };
  const rootState = {
    game: { CENTER: 10 },
  };

  actions.initSnake({ commit, dispatch, rootState, state, rootGetters });

  expect(state.blocks)
    .toHaveLength(state.INIT_SIZE);
  expect(state.blocks.map(({ idx }) => idx))
    .toEqual([10, 20])
  expect(dispatch)
    .toHaveBeenCalledWith('drawSnake');
  expect(commit)
    .toHaveBeenCalledTimes(state.INIT_SIZE);
});


describe('drawSnake', () => {
  it('init', () => {
    window.requestAnimFrame = jest.fn();

    const dispatch = jest.fn();
    const state = { blocks: [] };

    actions.drawSnake({ dispatch, state });

    expect(dispatch)
      .toHaveBeenNthCalledWith(1, 'initSnake');

    // expect(window.requestAnimFrame)
    //   .toHaveBeenCalled();
  });

  it.skip('move', () => {

  });
});