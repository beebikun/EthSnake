import Vue from 'vue';
import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Store from '@/store';
import BlockTransactions from '@/components/BlockTransactions.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

const blocksIdx = 0;
const BLOCK = { idx: 0, transactions: Array(2).fill('').map((_, idx) => ({
    hash: idx,
    transactionIndex: idx,
    from: 'from', to: 'to', value: 1,
    input: 'input', gasPrice: 10, gas: 100,
  }))
};


Vue.set(Store.state.api, 'blocks', [ BLOCK ]);
Vue.set(Store.state.api, 'showTransactionsIdx', blocksIdx);


it('render without crashing', () => {
  expect(Store.state.api.blocks[ Store.state.api.showTransactionsIdx ])
    .toEqual(BLOCK);
  const wrapper = shallowMount(BlockTransactions, { localVue, store: Store });
  expect(wrapper.vm.block)
    .toEqual(BLOCK);
  const items = wrapper.findAll('.block-info');
  expect(items)
    .toHaveLength(BLOCK.transactions.length);
});


it('hideTransactions', () => {
  const mockedDispatch = jest.spyOn(Store, 'dispatch');
  const wrapper = shallowMount(BlockTransactions, { localVue, store: Store });
  const hideTransactions = wrapper.find('.toggleShowTransactions');

  expect(wrapper.vm.showTransactions)
    .toBeInstanceOf(Function);

  hideTransactions.trigger('click');

  expect(mockedDispatch)
    .toHaveBeenCalledWith('showTransactions', null);
});