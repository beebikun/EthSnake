import actions from '@/store/game/tokens/actions';

it('addToken', () => {
  const idx = '1';
  const blockIdx = 'blockIdx';
  const rootGetters = {
    get getFree() {
      return idx;
    },
  };
  const gettersSpy = jest.spyOn(rootGetters, 'getFree', 'get');
  const commit = jest.fn();

  actions.addToken({ rootGetters, commit }, blockIdx);
  expect(gettersSpy)
    .toHaveBeenCalled();
  expect(commit)
    .toHaveBeenCalledWith('addToken', { idx, blockIdx });
});

it('deleteToken', () => {
  const idx = '1';
  const commit = jest.fn();

  actions.deleteToken({ commit }, idx);
  expect(commit)
    .toHaveBeenCalledWith('deleteToken', idx);
});



describe('collectTokens', () => {
  const existIdx = '1';
  const blockIdx = 'blockIdx';
  const state = {
    [ existIdx ] : blockIdx,
    [ existIdx + 10 ] : blockIdx + 10,
  };
  const dispatch = jest.fn((name, idx) => {
    if (name === 'deleteToken') {
      delete state[idx];
    }
  });

  it.each`
    idx                | isCalled   | isEmpty
    ${ existIdx }      | ${ true }  | ${ false }
    ${ existIdx + 1 }  | ${ false } | ${ false }
    ${ existIdx + 10 } | ${ true }  | ${ true }
  `('$idx => $isCalled ( game is win: $isEmpty )', ({ idx, isCalled, isEmpty }) => {
      dispatch.mockClear();

      actions.collectTokens({ dispatch, state }, idx);
      if (isCalled) {
        expect(dispatch)
          .toHaveBeenNthCalledWith(1, 'deleteToken', idx);
        expect(dispatch)
          .toHaveBeenNthCalledWith(2, 'lvlupSnake');

        if (isEmpty) {
          expect(dispatch)
            .toHaveBeenNthCalledWith(3, 'win');
        }
      } else {
        expect(dispatch)
          .not.toHaveBeenCalled();
      }
  });
});