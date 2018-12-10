import mutations from '@/store/game/snake/mutations';
import State from '@/store/game/snake/state';


it('setSnake', () => {
  const old = [{ idx: 2 }];
  const state = { blocks: old };
  const blocks = [{ idx: 1 }];

  mutations.setSnake(state, blocks);

  expect(state.blocks)
    .toEqual(blocks);
});

describe('speedup', () => {
  const STATE = { SPEED_STEP: 5, MIN_SPEED: 3 };
  it.each`
    current | expected
    ${ 10 } | ${ 5 }
    ${ 4 }  | ${ 3 }
  `('$current => $expected', ({ current, expected }) => {
    const state = { ...STATE, speed: current };
    mutations.speedup(state);
    expect(state.speed)
      .toEqual(expected);
  });
});

it('resetSpeed', () => {
  const state = { INIT_SPEED: 5, speed: 3 };
  mutations.resetSpeed(state);
  expect(state.speed)
    .toEqual(state.INIT_SPEED);
});

it('addFrameCount', () => {
  const state = { frameCount: 4 };

  mutations.addFrameCount(state);

  expect(state.frameCount)
    .toEqual(5);
});

it('flushFrameCount', () => {
  const state = { frameCount: 4 };

  mutations.flushFrameCount(state);

  expect(state.frameCount)
    .toEqual(0);
});


describe('setDirection', () => {
  const direction = 'UP';

  it.each`
    name        | expected
    ${ 'DOWN' } | ${ 'DOWN' }
    ${ 'NYAK' } | ${ direction }
  `('$name => $expected', ({ name, expected }) => {
    const state = { ...State, direction };
    mutations.setDirection(state, name);

    expect(state.direction)
      .toEqual(expected);
  });
});