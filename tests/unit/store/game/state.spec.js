import state, { getMatrixPos, matrixToIdx } from '@/store/game/state';

describe('SIZE', () => {
  it('initial', () => {
    const expected = expect.objectContaining({
      w: expect.any(Number),
      h: expect.any(Number),
      side: expect.any(Number),
      count: expect.any(Number),
    });
    expect(state.SIZE)
      .toMatchObject(expected);
  });

  it('expect SIZE be freeze', () => {
    expect(() => {
      state.SIZE.w = 'new value';
    }).toThrow();
  });
});

it('CENTER', () => {
  const center = parseInt(state.CENTER);
  expect(center)
    .toEqual(expect.any(Number));
});

describe('getMatrixPos | matrixToIdx', () => {
  const SIZE = state.SIZE;

  it.each`
    idx                 | y      | x
    ${ 0 }              | ${ 0 } | ${ 0 }
    ${ SIZE.w * 3 - 1 } | ${ 2 } | ${ SIZE.w - 1 }
    ${ SIZE.w * 2 }     | ${ 2 } | ${ 0 }
    ${ SIZE.w * 2 + 1 } | ${ 2 } | ${ 1 }
  `('$idx => x: $x, y: $y', ({idx, x, y}) => {
    const pos = getMatrixPos(idx);
    expect(pos)
      .toEqual({ x, y });
    const result = matrixToIdx(x, y);
    expect(result)
      .toEqual(idx.toString());
  });
});


it('tiles', () => {
  const SIZE = state.SIZE;
  expect(state.tiles)
    .toBeInstanceOf(Array);
  expect(state.tiles)
    .toHaveLength(SIZE.count);
  const expectedTile = expect.objectContaining({
    id: expect.any(String),
    matrixPos: expect.objectContaining({ x: expect.any(Number), y: expect.any(Number) }),
    style: expect.objectContaining({
      width: expect.any(String),
      height: expect.any(String),
      top: expect.any(String),
      left: expect.any(String),
    }),
    idx: expect.any(String),
  });
  expect(state.tiles)
    .toContainEqual(expectedTile);

});

