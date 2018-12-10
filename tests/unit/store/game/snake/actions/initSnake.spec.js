import actions from '@/store/game/snake/actions';

it('initSnake', () => {
  const state = {
    INIT_SIZE: 2, blocks: [],
    direction: 'UP',
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

  actions.initSnake({ commit, dispatch, rootState, state, rootGetters });

  expect(rootGetters.neightborIdx)
    .toHaveBeenCalledWith(rootState.game.CENTER, 'DOWN');

  const blocks = [ { id: 'snake:0', idx: '10' }, { id: 'snake:1', idx: '20' } ]
  expect(commit)
    .toHaveBeenCalledWith('setSnake', blocks);
  expect(dispatch)
    .toHaveBeenCalledWith('drawSnake');
});
