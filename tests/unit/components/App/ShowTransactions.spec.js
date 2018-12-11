import Vue from 'vue';
import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Store from '@/store';
import App from '@/App.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

const wrapper = shallowMount(App, { localVue, store: Store });

it.each`
  showTransactionsIdx | isExists
  ${ 1 }              | ${ true }
  ${ null }           | ${ false }
`('showTransactionsIdx: $showTransactionsIdx => $isExists', ({ showTransactionsIdx, isExists }) => {
    Vue.set(Store.state.api, 'showTransactionsIdx', showTransactionsIdx);

    expect(wrapper.vm.$store.state.api.showTransactionsIdx)
      .toEqual(showTransactionsIdx);

    expect(wrapper.vm.showTransactions)
      .toEqual(showTransactionsIdx);

    const element = wrapper.find({ name: 'BlockTransactions' });
    expect(element.exists())
      .toBe(isExists);
});
