import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import App from '@/App.vue';
import Eth from 'web3-eth'; // mocked lib
import Store from '@/store';

const localVue = createLocalVue();
localVue.use(Vuex);

const mockedDispatch = jest.spyOn(Store, 'dispatch');

it('render without crashing', () => {
  const wrapper = shallowMount(App, { localVue, store: Store })
  expect(wrapper.vm.$store)
    .toBeInstanceOf(Object);
  expect(wrapper.vm.isValid)
    .toBe(false);
});

it('renders validation error case', () => {
  // mock web3
  window.web3 = undefined;
  const wrapper = shallowMount(App);
  const errorMessage = wrapper.find('#validation-error');
  const wApp = wrapper.find({name: 'Board'});
  expect(errorMessage.exists())
    .toBe(true);
  expect(wApp.exists())
    .toBe(false);

  expect(wrapper.vm.isValid)
    .toBe(false);
});

it('renders normal case', () => {
  mockedDispatch.mockClear();
  // mock web3
  window.web3 = {};
  const wrapper = shallowMount(App, { localVue, store: Store });
  const errorMessage = wrapper.find('#validation-error');
  const wApp = wrapper.find({ name: 'Board' });
  expect(errorMessage.exists())
    .toBe(false);
  expect(wApp.exists())
    .toBe(true);

  expect(mockedDispatch)
    .toHaveBeenNthCalledWith(1, 'drawSnake');

  const eth = expect.any(Eth);
  expect(mockedDispatch)
    .toHaveBeenNthCalledWith(2, 'setEth', eth);
  expect(Store.state.api.eth)
    .toEqual(eth);

  expect(wrapper.vm.isValid)
    .toBe(true);
});