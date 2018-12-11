import State from '@/store/api/state';
import mutations from '@/store/api/mutations';

it('set eth', () => {
  // mock state
  const state = { eth: null };
  const eth = { hello: 'there' };
  // apply mutation
  mutations.setEth(state, eth);
  // assert result
  expect(state.eth)
    .toEqual(eth);
});

it('showTransactions', () => {
  const state = { showTransactionsIdx: null };
  const idx = 1;
  mutations.showTransactions(state, idx);
  expect(state.showTransactionsIdx)
    .toBe(idx);
});

it('clear blocks', () => {
  const state = { blocks: [ 1, 2 ] };
  mutations.clearBlocks(state);
  // assert result
  expect(state.blocks)
    .toEqual([]);
});


it('add block', () => {
  // mock state
  const state = { blocks: [] };
  const block = { number: 1 };
  // apply mutation
  mutations.addBlock(state, block);
  // assert result
  expect(state.blocks)
    .toEqual([block]);
});

describe('addStats', () => {
  const blocksFieldName = State.STATS_KEYS[0];
  const transFieldName = State.TRANS_STATS_KEYS[0];
  const initialStats = State.blocksStats[blocksFieldName];

  const stats = { min: 5, max: 10 };
  const minValue = stats.min - 1;
  const maxValue = stats.max + 1;
  const avgValue = Math.round((stats.max + stats.min)/2);
  const anyValue = 7;

  describe.each`
    value         | startStart        | expectedStats
    ${ anyValue } | ${ initialStats } | ${ { min: anyValue, max: anyValue } }
    ${ minValue } | ${ stats }        | ${ { ...stats, min: minValue } }
    ${ maxValue } | ${ stats }        | ${ { ...stats, max: maxValue } }
    ${ avgValue } | ${ stats }        | ${ stats }
  `('$startStart >> $value ==> $expectedStats', ({ value, startStart, expectedStats }) => {
    const state = {
      STATS_KEYS: [ blocksFieldName ],
      TRANS_STATS_KEYS: [ transFieldName ],
      blocksStats: {
        [ blocksFieldName ] : { ...startStart },
        transactions: { ...startStart }
      },
      transStats: {
        [ transFieldName ] : { ...startStart },
      },
    };
    const block = {
      [ blocksFieldName ]: value,
      transactions: Array(value).fill('t').map(() => ({
        [ transFieldName ]: value,
      })),
    };
    mutations.addStats(state, block);

    it('blocksStats', () => {
      expect(state.blocksStats[blocksFieldName])
        .toEqual(expectedStats);
    });

    it('blocksStats: transactions length', () => {
      expect(state.blocksStats.transactions)
        .toEqual(expectedStats);
    });

    it('transStats', () => {
      expect(state.transStats[transFieldName])
        .toEqual(expectedStats);
    });
  });
});