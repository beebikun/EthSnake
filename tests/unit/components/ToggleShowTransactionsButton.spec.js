import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Store from '@/store';
import ToggleShowTransactionsButton from '@/components/ToggleShowTransactionsButton.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

const mockedDispatch = jest.spyOn(Store, 'dispatch');

it.each`
  blockIdx  | text
  ${ 1 }    | ${ 'SHOW' }
  ${ null } | ${ 'HIDE' }
`('$text', ({ blockIdx, text }) => {
  mockedDispatch.mockClear();
  const wrapper = shallowMount(ToggleShowTransactionsButton, {
      localVue, store: Store,
      propsData: { blockIdx },
    });
  expect(wrapper.text())
    .toEqual(text);

  expect(wrapper.vm.showTransactions)
    .toBeInstanceOf(Function);
  wrapper.trigger('click');
  expect(mockedDispatch)
    .toHaveBeenCalledWith('showTransactions', blockIdx);
});
