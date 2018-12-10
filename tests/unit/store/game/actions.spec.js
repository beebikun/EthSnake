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

describe('switchGameState', () => {
  it.each`
  initial                    | dispatchName
  ${ State.STATES.PAUSE }    | ${ 'resume' }
  ${ State.STATES.RUN }      | ${ 'pause' }
  ${ State.STATES.GAMEOVER } | ${ 'rerun' }
  ${ State.STATES.WIN }      | ${ 'rerun' }
  ${ 'unknown' }             | ${ null }
  `('$initial => $dispatchName', ({ initial, dispatchName }) => {
    const dispatch = jest.fn();
    const state = {...State, STATE: initial};
    actions.switchGameState({ dispatch, state });

    if (dispatchName) {
      expect(dispatch)
        .toHaveBeenCalledWith(dispatchName);
    } else {
      expect(dispatch)
        .not.toHaveBeenCalled();
    }
  });
});

describe('run', () => {
  it('game wasnt started yet', () => {
    const dispatch = jest.fn();
    const state = { STATE: null };
    const Eth = {};

    actions.run({ dispatch, state }, Eth);

    expect(dispatch)
      .toHaveBeenNthCalledWith(1, 'initSnake');
    expect(dispatch)
      .toHaveBeenNthCalledWith(2, 'setEth', Eth);
  });

  it('game already started', () => {
    const dispatch = jest.fn();
    const commit = jest.fn();
    const state = { STATE: 'not null' };

    actions.run({ dispatch, state, commit });

    expect(dispatch)
      .not.toHaveBeenCalled();
    expect(commit)
      .not.toHaveBeenCalled();
  });
});

it('rerun', () => {
  const dispatch = jest.fn();
  actions.rerun({ dispatch });

  expect(dispatch)
    .toHaveBeenNthCalledWith(1, 'createSnake');
  expect(dispatch)
    .toHaveBeenNthCalledWith(2, 'fetchBlocks');
});


it('win', () => {
  const commit = jest.fn();
  actions.win({ commit, state: State });
  expect(commit)
    .toHaveBeenCalledWith('changeGameState', State.STATES.WIN);
});