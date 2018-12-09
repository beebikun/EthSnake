import getters from '@/store/game/getters';
import State from '@/store/game/state';

const N = State.SIZE.count * 3;

it('useTile', () => {
  const step = 3;
  const tokens = Array(State.SIZE.count)
    .fill()
    .map((_, i) => i % step === 0 ? i : undefined)
    .reduce((bucket, idx) => {
      if (idx !== undefined) {
        bucket[idx] = true;
      }
      return bucket;
    }, {});
  const state = {
    ...State,
    tokens,
  };
  // use Set for testing random
  const idxs = new Set();
  for (let i = 0; i < N; i++) {
    const idx = getters.getFree(state);
    expect(typeof idx)
      .toBe('string');
    expect(tokens[idx])
      .toBeUndefined();
    idxs.add(idx);
  }

  expect(idxs.size)
    .not
    .toEqual(1);
});
