import Vue from 'vue';
import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Store from '@/store';
import BlockTransactions from '@/components/BlockTransactions.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

const blockIdx = 0;
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
const transStats = {
  value: { min: 10, max: 200 },
  gasPrice: { min: 10, max: 200 },
  gas: { min: 10, max: 200 },
};

const elements = [
  [ 'Transaction Index:', TRANSACTION.transactionIndex ],
  [ 'Value:', TRANSACTION.value, '0.0' ],
  [ 'Gas Price:', TRANSACTION.gasPrice, '47.4' ],
  [ 'Gas:', TRANSACTION.gas, '100.0' ],
];


Vue.set(Store.state.api, 'transStats', transStats);
Vue.set(Store.state.api, 'blocks', [ BLOCK ]);
Vue.set(Store.state.api, 'showTransactionsIdx', blockIdx);


describe('render without crashing', () => {
  const wrapper = shallowMount(BlockTransactions, { localVue, store: Store });

  it('check getting block', () => {
    expect(Store.state.api.blocks[ Store.state.api.showTransactionsIdx ])
      .toEqual(BLOCK);
    expect(wrapper.vm.block)
      .toEqual(BLOCK);
    const header = wrapper.find('h2');
    expect(header.text())
      .toEqual(BLOCK.number.toString());
  });


  describe('transactions items for block', () => {
    const items = wrapper.findAll('.block-info');

    it('items length', () => {
      expect(items)
        .toHaveLength(transactions.length);
    });


    transactions.forEach((transaction, idx) => {
      const item = items.at(idx);
      const dts = item.findAll('dt');
      const dds = item.findAll('dd');

      it('dts/dds length', () => {
        expect(dts).toHaveLength(elements.length);
        expect(dds).toHaveLength(elements.length);
      });

      elements.forEach(([title, value, percent], elementsIdx) => {
        it(title, () => {
          const dt = dts.at(elementsIdx);
          expect(dt.text()).toEqual(title);
          const dd = dds.at(elementsIdx);
          expect(dd.text()).toEqual(value.toString());
          const bar = dd.find('.stats');
          if (percent === undefined) {
            expect(bar.exists())
              .toBe(false);
          } else {
            expect(bar.exists())
              .toBe(true);
            expect(bar.attributes('style'))
              .toEqual(`width: ${ percent }%;`);
          }
        });
      });
    });
  });
});


it('hideTransactions', () => {
  const wrapper = shallowMount(BlockTransactions, { localVue, store: Store });
  const hideTransactions = wrapper.find({ name: 'ToggleShowTransactionsButton' });

  expect(hideTransactions.exists())
    .toBe(true);
  expect(hideTransactions.props('blockIdx'))
    .toBeFalsy();
});