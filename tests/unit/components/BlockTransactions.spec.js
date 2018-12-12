import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import BlockTransactions from '@/components/BlockTransactions.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

const BLOCK_IDX = 0;
const TRANSACTION = {
  hash: 0,
  transactionIndex: 0,
  from: 'from', to: 'to', input: 'input',
  value: 10,  gasPrice: 100, gas: 200,
};
const transactions = Array(2).fill('')
  .map((_, idx) => ({ ...TRANSACTION, hash: idx }));
const BLOCK = {
  idx: 0, number: 1, transactions,
};

it('showTransactionsIdx is null', () => {
  const store = getStore(null);
  const wrapper = shallowMount(BlockTransactions, { localVue, store });
  expect(wrapper.vm.block)
    .toEqual({});
});


it('getStatsItems', () => {
  const store = getStore(BLOCK_IDX);
  const wrapper = shallowMount(BlockTransactions, { localVue, store });

  const statsItems = wrapper.vm.getStatsItems(TRANSACTION);
  expect(statsItems)
    .toEqual([
      { key: 'transactionIndex', title: 'Transaction Index',
        value: TRANSACTION.transactionIndex },
      { key: 'value', title: 'Value' },
      { key: 'gasPrice', title: 'Gas Price' },
      { key: 'gas', title: 'Gas' },
  ]);
});


describe('showTransactionsIdx is number', () => {
  const store = getStore(BLOCK_IDX);
  const wrapper = shallowMount(BlockTransactions, { localVue, store });

  it('check getting block', () => {
    expect(wrapper.vm.block)
      .toEqual(BLOCK);
    const header = wrapper.find('h2');
    expect(header.text())
      .toEqual(BLOCK.number.toString());
  });

  describe('StatsList for each transactions', () => {
    const StatsListItems = wrapper.findAll({ name: 'StatsList' });

    it('StatsListItems length', () => {
      expect(wrapper.vm.block.transactions)
          .toHaveLength(transactions.length);
      expect(StatsListItems)
        .toHaveLength(transactions.length);
    });

    it('StatsListItems props', () => {
      transactions.forEach((transaction, idx) => {
        const StatsList = StatsListItems.at(idx);
        expect(StatsList.props())
          .toEqual({
            src: transaction,
            isBlockStats: false,
            items: expect.any(Array),
          });
      });
    });
  });
});

it('hideTransactions', () => {
  const store = getStore(BLOCK_IDX);
  const wrapper = shallowMount(BlockTransactions, { localVue, store });
  const hideTransactions = wrapper.find({ name: 'ToggleShowTransactionsButton' });

  expect(hideTransactions.exists())
    .toBe(true);
  expect(hideTransactions.props('blockIdx'))
    .toBeFalsy();
});

function getStore(blockIdx) {
  return new Vuex.Store({
    state: {
      api: {
        showTransactionsIdx: blockIdx,
        blocks: [ BLOCK ],
      }
    },
  });
}
