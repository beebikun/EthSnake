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
  }

  it.each`
    idx               | isCalled
    ${ existIdx }     | ${ true }
    ${ existIdx + 1 } | ${ false }
  `('$idx => $isCalled', ({ idx, isCalled }) => {
      const dispatch = jest.fn();
      actions.collectTokens({ dispatch, state }, idx);
      if (isCalled) {
        expect(dispatch)
          .toHaveBeenCalledWith('deleteToken', idx);
      } else {
        expect(dispatch)
          .not.toHaveBeenCalled();
      }
  });
});