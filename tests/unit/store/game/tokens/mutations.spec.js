import mutations from '@/store/game/tokens/mutations';


it('addToken', () => {
  // mock state
  const idx = 2;
  const blockIdx = 'blockIdx';
  const state = {
  };
  // apply mutation
  mutations.addToken(state, { idx, blockIdx });
  // assert result
  expect(state)
    .toEqual({ [idx]: blockIdx });
});

it('deleteToken', () => {
  // mock state
  const idx = 2;
  const blockIdx = 'blockIdx';
  const state = { [idx]: blockIdx };
  // apply mutation
  mutations.deleteToken(state, idx);
  // assert result
  expect(state)
    .toEqual({});
});
