import RootGetters from '@/store/game/getters';
import RootState from '@/store/game/state';
import actions from '@/store/game/snake/actions';

describe('moveSnake', () => {
  const SIZE = RootState.SIZE;
  const leftTopIdx = 0;
  const rightBottomIdx = SIZE.count - 1;

  const secondRowFirst = leftTopIdx + SIZE.w;
  const thrdRowFirst = secondRowFirst + SIZE.w;
  const pRowLast = rightBottomIdx - SIZE.w;
  const ppRowLast = pRowLast - SIZE.w;

  const rootGetters = {
    neightborIdx: RootGetters.neightborIdx(RootState),
  };

  describe('leftTopIdx, leftTopIdx + 1', () => {
    const blocks = [ leftTopIdx, leftTopIdx + 1 ];
    expectBlocks(blocks, {
      DOWN: [ secondRowFirst, leftTopIdx ],
      UP: null,     // borde
      RIGHT: null,  // collision
      LEFT: null,   // border
    });
  });

  describe('leftTopIdx + 1, leftTopIdx', () => {
    const blocks = [ leftTopIdx + 1, leftTopIdx ];
    expectBlocks(blocks, {
      DOWN: [ secondRowFirst + 1, leftTopIdx + 1 ],
      UP: null,     // border
      RIGHT: [ leftTopIdx + 2, leftTopIdx + 1 ],
      LEFT: null,   // collision
    });
  });

  describe('leftTopIdx, secondRowFirst', () => {
    const blocks = [ leftTopIdx, secondRowFirst ];
    expectBlocks(blocks, {
      DOWN: null,  // collision
      UP: null, // border
      RIGHT: [ leftTopIdx + 1, leftTopIdx ],  // collision
      LEFT: null,   // border
    });
  });

  describe('secondRowFirst, leftTopIdx', () => {
    const blocks = [ secondRowFirst, leftTopIdx ];
    expectBlocks(blocks, {
      DOWN: [ thrdRowFirst, secondRowFirst ],  // collision
      UP: null, // collision
      RIGHT: [ secondRowFirst + 1, secondRowFirst ],
      LEFT: null,   // border
    });
  });

  describe('pRowLast, rightBottomIdx', () => {
    const blocks = [ pRowLast, rightBottomIdx ];
    expectBlocks(blocks, {
      DOWN: null,  // collision
      UP: [ppRowLast, pRowLast],
      RIGHT: null, // border
      LEFT: [pRowLast - 1, pRowLast],
    });
  });

  describe('rightBottomIdx, pRowLast', () => {
    const blocks = [ rightBottomIdx, pRowLast ];
    expectBlocks(blocks, {
      DOWN: null,  // border
      UP: null, // collition
      RIGHT: null, // border
      LEFT: [rightBottomIdx - 1, rightBottomIdx],
    });
  });


  function expectBlocks(blocks, { DOWN, UP, RIGHT, LEFT }) {
    it.each`
    direction    | expected
    ${ 'DOWN' }  | ${ DOWN }
    ${ 'UP' }    | ${ UP }
    ${ 'RIGHT' } | ${ RIGHT }
    ${ 'LEFT' }  | ${ LEFT }
    `('$direction: $expected', ({ direction, expected }) => {
      const state = { direction, blocks: idx2blocks(blocks) };
      const dispatch = jest.fn();
      const commit = jest.fn();
      actions.moveSnake({ dispatch, commit, state, rootGetters });
      if (expected === null) {
        expect(commit).not.toHaveBeenCalled();
        expect(dispatch)
          .toHaveBeenCalledWith('gameover');
      } else {
        expect(dispatch).not.toHaveBeenCalled();
        expect(commit)
          .toHaveBeenCalledWith('setSnake', idx2blocks(expected));
      }

      function idx2blocks(idxs) {
        return idxs.map((idx, i) => ({ i: 'snake:' + i, idx: idx.toString() }));
      }
    });
  }
});
