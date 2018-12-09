import mutations from '@/store/game/mutations';


it('addToken', () => {
  // mock state
  const idx = 2;
  const blockIdx = 'blockIdx';
  const state = {
    tokens: {},
  };
  // apply mutation
  mutations.addToken(state, { idx, blockIdx });
  // assert result
  expect(state.tokens)
    .toEqual({ [idx]: blockIdx });
});

it('deleteToken', () => {
  // mock state
  const idx = 2;
  const blockIdx = 'blockIdx';
  const state = {
    tokens: { [idx]: blockIdx },
  };
  // apply mutation
  mutations.deleteToken(state, idx);
  // assert result
  expect(state.tokens)
    .toEqual({});
});
