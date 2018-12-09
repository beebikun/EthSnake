import getters from '@/store/game/getters';
import State from '@/store/game/state';

const N = State.SIZE.count * 3;

it('useTile', () => {
  const tokensStep = 5;
  const tokens = getUsedIdxs(tokensStep)
    .reduce((bucket, idx) => {
      bucket[idx] = true;
      return bucket;
    }, {});
  const snakeStep = 10;
  const snake = getUsedIdxs(snakeStep);
  const rootState = {
    tokens,
    snake: { blocks: snake.map((idx) => ({ idx })) },
  };
  // use Set for testing random
  const idxs = new Set();
  for (let i = 0; i < N; i++) {
    const idx = getters.getFree(State, null, { game: rootState });
    expect(typeof idx)
      .toBe('string');
    expect(tokens[idx])
      .toBeUndefined();
    expect(snake.includes(idx))
      .toBe(false);
    idxs.add(idx);
  }

  expect(idxs.size)
    .not
    .toEqual(1);

  function getUsedIdxs(step) {
    return Array(State.SIZE.count).fill()
      .map((_, i) => i % step === 0 ? i.toString() : undefined)
      .filter(i => i !== undefined);
  }
});


describe('idxBelow', () => {
  it.each`
  idx                        | expected
  ${ 0 }                     | ${ State.SIZE.w }
  ${ State.SIZE.count + 1 } | ${ null }
  `('$idx => $expected', ({ idx, expected }) => {
    const result = getters.idxBelow(State)(idx);
    expect(result)
      .toEqual(expected);
  });
});
