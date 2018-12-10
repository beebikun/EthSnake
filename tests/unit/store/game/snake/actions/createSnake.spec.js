import actions from '@/store/game/snake/actions';

it('createSnake', () => {
  const state = {
    INIT_SIZE: 2,
    INIT_DIRECTION: 'UP',
    blocks: [],
    DIRECTIONS: {
      UP: 'UP',
      DOWN: 'DOWN',
    }
  };
  const commit = jest.fn();
  const dispatch = jest.fn();
  const rootGetters = {
    neightborIdx: jest.fn()
      .mockReturnValueOnce(20),
  };
  const rootState = {
    game: { CENTER: '10' },
  };

  actions.createSnake({ dispatch, commit, rootState, state, rootGetters });

  expect(dispatch)
    .toHaveBeenCalledWith('pause');

  expect(rootGetters.neightborIdx)
    .toHaveBeenCalledWith(rootState.game.CENTER, 'DOWN');

  expect(commit)
    .toHaveBeenNthCalledWith(1, 'resetSpeed');
  expect(commit)
    .toHaveBeenNthCalledWith(2, 'setDirection', state.INIT_DIRECTION);
  const blocks = [ { id: 'snake:0', idx: '10' }, { id: 'snake:1', idx: '20' } ]
  expect(commit)
    .toHaveBeenNthCalledWith(3, 'setSnake', blocks);
});
