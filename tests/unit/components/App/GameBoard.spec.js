import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Eth from 'web3-eth'; // mocked lib
import Store from '@/store';
import App from '@/App.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

const mockedDispatch = jest.spyOn(Store, 'dispatch');
beforeEach(() => {
  mockedDispatch.mockClear();
});

it('renders validation error case', () => {
  // mock web3
  window.web3 = undefined;
  const wrapper = shallowMount(App, { localVue, store: Store });
  const errorMessage = wrapper.find('#validation-error');
  const GameBoard = wrapper.find({ name: 'GameBoard' });

  expect(errorMessage.exists())
    .toBe(true);
  expect(GameBoard.exists())
    .toBe(false);

  expect(wrapper.vm.isValid)
    .toBe(false);
});

it('renders normal case', () => {
  // mock web3
  window.web3 = {};
  const wrapper = shallowMount(App, { localVue, store: Store });
  const errorMessage = wrapper.find('#validation-error');
  const GameBoard = wrapper.find({ name: 'GameBoard' });

  expect(errorMessage.exists())
    .toBe(false);
  expect(GameBoard.exists())
    .toBe(true);

  const eth = expect.any(Eth);
  expect(mockedDispatch)
    .toHaveBeenCalledWith('run', eth);

  expect(Store.state.api.eth)
    .toEqual(eth);

  expect(wrapper.vm.isValid)
    .toBe(true);
});