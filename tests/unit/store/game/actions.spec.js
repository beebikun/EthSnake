import State from '@/store/game/state';
import actions from '@/store/game/actions';


it.each`
  name            | gameState
  ${ 'gameover' } | ${ State.STATES.GAMEOVER }
  ${ 'pause' }    | ${ State.STATES.PAUSE }
  ${ 'resume' }   | ${ State.STATES.RUN }
`('$name', ({ name, gameState }) => {
  const commit = jest.fn();
  actions[name]({ commit, state: State });

  expect(commit)
    .toHaveBeenCalledWith('changeGameState', gameState);
});

describe('togglePause', () => {
  it.each`
  initial                 | dispatchName
  ${ State.STATES.PAUSE } | ${ 'resume' }
  ${ State.STATES.RUN }   | ${ 'pause' }
  `('$initial => $dispatchName', ({ initial, dispatchName }) => {
    const dispatch = jest.fn();
    const state = {...State, STATE: initial};
    actions.togglePause({ dispatch, state });

    expect(dispatch)
      .toHaveBeenCalledWith(dispatchName);
  });
});
