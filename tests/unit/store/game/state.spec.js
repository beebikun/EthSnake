import state from '@/store/game/state';

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

it('tokens', () => {
  expect(state.tokens)
    .toEqual({});
});
