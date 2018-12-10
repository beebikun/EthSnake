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
  const name = State.STATS_KEYS[0];
  const initialStats = State.blocksStats[name];

  const stats = { min: 5, max: 10 };
  const minValue = stats.min - 1;
  const maxValue = stats.max + 1;
  const avgValue = (stats.max + stats.min)/2;
  const anyValue = 7;

  it.each`
    value         | blocksStats       | expectedStats
    ${ anyValue } | ${ initialStats } | ${ { min: anyValue, max: anyValue } }
    ${ minValue } | ${ stats }        | ${ { ...stats, min: minValue } }
    ${ maxValue } | ${ stats }        | ${ { ...stats, max: maxValue } }
    ${ avgValue } | ${ stats }        | ${ stats }
  `('$blocksStats >> $value ==> $expectedStats', ({ value, blocksStats, expectedStats }) => {
    const state = {
      STATS_KEYS: [ name ],
      blocksStats: {
        [ name ] : { ...blocksStats },
        transactions: { ...stats }
      },
    };
    const block = { [ name ]: value, transactions: Array(minValue).fill('t') };
    mutations.addStats(state, block);
    expect(state.blocksStats)
      .toEqual({
        [name]: expectedStats,
        transactions: { ...stats, min: minValue },
      });
  });
});