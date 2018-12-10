import getters from '@/store/game/getters';
import State from '@/store/game/state';

const N = State.SIZE.count * 3;

it('getFree', () => {
  const tokensStep = 5;
  const tokens = getUsedIdxs(tokensStep)
    .reduce((bucket, idx) => {
      bucket[idx] = true;
      return bucket;
    }, {});
  const snakeStep = 10;
  const snake = getUsedIdxs(snakeStep);
  // use Set for testing random
  const state = { ...State, tokens, snake: { blocks: snake.map((idx) => ({ idx })) } };
  const idxs = new Set();
  for (let i = 0; i < N; i++) {
    const idx = getters.getFree(state);
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


it('getCollected', () => {
  const rootState = {
    api: {
      blocks: [ { idx: '1'}, { idx: '2'}, { idx: '3' } ],
    },
  };
  const state = {
    tokens: {
      '1': '2'
    },
  };

  const result = getters.getCollected(state, null, rootState);
  expect(result)
    .toEqual([ { idx: '1'}, { idx: '3' } ]);
});


describe('neightborIdx', () => {
  const rightBottomIdx = State.SIZE.count - 1;

  describe('leftTopIdx', () => {
    const leftTopIdx = 0;
    const secondRowFirst = leftTopIdx + State.SIZE.w;
    const expected = { DOWN: secondRowFirst, UP: null, RIGHT: leftTopIdx + 1, LEFT: null };
    expectNeightbors(leftTopIdx, expected);
  });
  describe('rightTopIdx', () => {
    const rightTopIdx = State.SIZE.w - 1;
    const secondRowLast = rightTopIdx + State.SIZE.w;
    const expected = { DOWN: secondRowLast, UP: null, RIGHT: null, LEFT: rightTopIdx - 1 };
    expectNeightbors(rightTopIdx, expected);
  });
  describe('leftBottomIdx', () => {
    const leftBottomIdx = rightBottomIdx - State.SIZE.w + 1;
    const pRowFirst = leftBottomIdx - State.SIZE.w;
    const expected = { DOWN: null, UP: pRowFirst, RIGHT: leftBottomIdx + 1, LEFT: null };
    expectNeightbors(leftBottomIdx, expected);
  });
  describe('rightBottomIdx', () => {
    const pRowLast = rightBottomIdx - State.SIZE.w;
    const expected = { DOWN: null, UP: pRowLast, RIGHT: null, LEFT: rightBottomIdx - 1 };
    expectNeightbors(rightBottomIdx, expected);
  });

  function expectNeightbors(idx, { DOWN, UP, RIGHT, LEFT }) {
    it.each`
      direction    | expected
      ${ 'DOWN' }  | ${ DOWN }
      ${ 'UP' }    | ${ UP }
      ${ 'RIGHT' } | ${ RIGHT }
      ${ 'LEFT' }  | ${ LEFT }
    `('$direction => $expected', ({ direction, expected }) => {
      const result = getters.neightborIdx(State)(idx, direction);
      expect(result)
        .toEqual(expected ? expected.toString() : expected);
    });
  }
});
