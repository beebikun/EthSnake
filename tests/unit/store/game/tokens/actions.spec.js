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

