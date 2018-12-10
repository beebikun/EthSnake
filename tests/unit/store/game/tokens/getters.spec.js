import getters from '@/store/game/tokens/getters';

describe('findToken', () => {
  const blockIdx = 'blockIdx';
  const existsIdx = '1';
  const state = {
    [ existsIdx ] : blockIdx,
  };

  it.each`
  idx                | expected
  ${ existsIdx }     | ${ blockIdx },
  ${ existsIdx + 1 } | ${ undefined },
  `('$idx => $expected', ({ idx, expected }) => {
    const result = getters.findToken(state)(idx);
    expect(result)
      .toEqual(expected);
  });
});
