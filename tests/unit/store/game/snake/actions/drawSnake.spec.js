import actions from '@/store/game/snake/actions';

describe('Check game state', () => {
  it.each`
    gameState    | isRun
    ${ 'RUN' }   | ${ true }
    ${ 'OTHER' } | ${ false }
  `('$gameState', ({ gameState, isRun }) => {
    window.requestAnimationFrame = jest.fn();
    const rootState = { game: { STATE: gameState, STATES: { RUN: 'RUN' } } };
    const commit = jest.fn();
    const state = { frameCount: 0, speed: 10 };
    actions.drawSnake({ commit, rootState, state });

    if (isRun) {
      expect(commit)
        .toHaveBeenCalledTimes(1);
    } else {
      expect(commit)
        .not.toHaveBeenCalled();
    }
    expect(window.requestAnimationFrame)
      .toHaveBeenCalled();
  });
});

describe('drawSnake', () => {
  const speed = 10;
  const state = { blocks: [], frameCount: 0, speed };
  const commit = jest.fn((name) => {
    if (name === 'addFrameCount') {
      state.frameCount += 1;
    } else if (name === 'flushFrameCount') {
      state.frameCount = 0;
    }
  });
  const rootState = { game: { STATE: 'RUN', STATES: { RUN: 'RUN' } }};

  it.each`
    isCalled   | frameCount | expectedCount
    ${ false } | ${ 0 }     | ${ 1 }
    ${ true }  | ${ 9 }     | ${ 0 }
  `('Frame count $frameCount => `moveSnake` is called: $isCalled',
    ({ isCalled, frameCount, expectedCount }) => {
      state.frameCount = frameCount;
      commit.mockClear();
      window.requestAnimationFrame = jest.fn();
      const dispatch = jest.fn();

      actions.drawSnake({ dispatch, state, commit, rootState });

      expect(commit)
        .toHaveBeenNthCalledWith(1, 'addFrameCount');

      if (isCalled) {
        expect(commit)
          .toHaveBeenNthCalledWith(2, 'flushFrameCount');
        expect(dispatch)
          .toHaveBeenCalledWith('moveSnake');
      } else {
        expect(commit)
          .toHaveBeenCalledTimes(1);
        expect(dispatch)
          .not
          .toHaveBeenCalled();
      }
      expect(state.frameCount)
        .toBe(expectedCount);
      expect(window.requestAnimationFrame)
        .toHaveBeenCalled();
    });

  it('requestAnimationFrame debounce', (done) => {
    state.frameCount = 0;
    commit.mockClear();
    window.requestAnimationFrame = jest.fn((cb) => {
      cb();
    });

    const dispatch = jest.fn((name) => {
      if (name === 'moveSnake') {
        expect(state.frameCount)
          .toEqual(0);
        expect(window.requestAnimationFrame)
          .toHaveBeenCalledTimes(speed - 1);
        expect(dispatch)
          .toHaveBeenCalledTimes(speed);
        expect(dispatch.mock.calls)
          .toEqual(Array(speed - 1).fill(['drawSnake']).concat([['moveSnake']]));
        expect(commit.mock.calls)
          .toEqual(Array(speed).fill(['addFrameCount']).concat([['flushFrameCount']]));

        window.requestAnimationFrame = Function.prototype;
        done();
      } else {
        drawSnake();
      }
    });

    drawSnake();

    function drawSnake() {
      actions.drawSnake({ dispatch, state, commit, rootState });
    }
  });
});