import State from '@/store/game/snake/state';
import RootState from '@/store/game/state';
import actions from '@/store/game/snake/actions';

describe('Active State', () => {
  const rootState = { game: { ...RootState, STATE: RootState.STATES.RUN } };

  describe.each`
    old        | UP        | DOWN      | LEFT      | RIGHT
    ${'UP'}    | ${ null } | ${ null } | ${ true } | ${ true } |
    ${'DOWN'}  | ${ null } | ${ null } | ${ true } | ${ true } |
    ${'LEFT'}  | ${ true } | ${ true } | ${ null } | ${ null } |
    ${'RIGHT'} | ${ true } | ${ true } | ${ null } | ${ null } |
    `('$old', expectSetDirection);

  function expectSetDirection({ old, UP, DOWN, LEFT, RIGHT }) {
    it.each`
      name       | expected
      ${'UP'}    | ${ UP }
      ${'DOWN'}  | ${ DOWN }
      ${'LEFT'}  | ${ LEFT }
      ${'RIGHT'} | ${ RIGHT }
      ${'NYAK'}  | ${ null }
    `('>> $name => $expected', expedChange);

    function expedChange({ name, expected }) {
      const commit = jest.fn();
      const state = { ...State, direction: old }
      actions.setDirection({ commit, state, rootState }, name);

      if (expected) {
        expect(commit)
          .toHaveBeenCalledWith('setDirection', name);
      } else {
        expect(commit)
          .not
          .toHaveBeenCalled();
      }
    }
  }
});


describe('Not Active State', () => {
  const rootState = { game: { ...RootState, STATE: RootState.STATES.PAUSE } };

  Object.keys(State.DIRECTIONS)
    .forEach((old) => {
      Object.keys(State.DIRECTIONS)
        .forEach((direction) => {
          const commit = jest.fn();
          const state = { ...State, direction: old };

          actions.setDirection({ commit, state, rootState }, direction);

          expect(commit)
            .not.toHaveBeenCalled();
        });

    });
});