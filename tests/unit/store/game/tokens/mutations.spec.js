import mutations from '@/store/game/tokens/mutations';


it('addToken', () => {
  const idx = 2;
  const blockIdx = 'blockIdx';
  const state = {
  };
  mutations.addToken(state, { idx, blockIdx });
  expect(state)
    .toEqual({ [idx]: blockIdx });
});

it('deleteToken', () => {
  const idx = 2;
  const blockIdx = 'blockIdx';
  const state = { [idx]: blockIdx, [ idx + 1 ]: blockIdx + 1 };
  mutations.deleteToken(state, idx);
  expect(state)
    .toEqual({
      [ idx + 1 ]: blockIdx + 1,
    });
});

it('clearBlocks', () => {
  const state = { 1: 'blockIdx1', 2: 'blockIdx2' };
  mutations.clearBlocks(state);
  expect(state)
    .toEqual({});
});