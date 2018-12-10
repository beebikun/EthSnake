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