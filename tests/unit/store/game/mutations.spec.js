import mutations from '@/store/game/mutations';

it('changeGameState', () => {
  const state = { STATE: 'old' };
  const value = 'new';
  mutations.changeGameState( state, value );
  expect(state.STATE)
    .toBe(value);
});