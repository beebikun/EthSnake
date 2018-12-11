import Vue from 'vue';
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

it('render without crashing', () => {
  const wrapper = shallowMount(App, { localVue, store: Store });
  expect(wrapper.vm.$store)
    .toBeInstanceOf(Object);
  expect(wrapper.vm.isValid)
    .toBe(false);
});

describe('keybindings', () => {
  const mockedMounted = jest.spyOn(App, 'mounted');
  const wrapper = shallowMount(App, { localVue, store: Store });

  afterEach(() => {
    Vue.set(Store.state.game, 'STATE', null);
  });


  it('check actions map', () => {
    expect(mockedMounted)
      .toHaveBeenCalled();
    expect(wrapper.vm.setDirection)
      .toBeInstanceOf(Function);
    expect(wrapper.vm.switchGameState)
      .toBeInstanceOf(Function);
    expect(wrapper.vm.pause)
      .toBeInstanceOf(Function);
  });

  describe('pause on click', () => {
    it('call when game is active', () => {
      Vue.set(Store.state.game, 'STATE', 'RUN');
      wrapper.trigger('click');
      expect(mockedDispatch)
        .toHaveBeenLastCalledWith('pause');
    });
    it('dont call when game isnt active', () => {
      Vue.set(Store.state.game, 'STATE', 'WIN');
      wrapper.trigger('click');
      expect(mockedDispatch)
        .not.toHaveBeenCalled();
    });
  });

  it('switchGameState', () => {
    wrapper.trigger('keyup.space');
    expect(mockedDispatch)
      .toHaveBeenLastCalledWith('switchGameState');
  });

  describe('movement', () => {
    it.each`
    eventName    | direction
    ${ 'left' }  | ${ 'LEFT' }
    ${ 'right' } | ${ 'RIGHT' }
    ${ 'up' }    | ${ 'UP' }
    ${ 'down' }  | ${ 'DOWN' }
    `('$direction', ({ eventName, direction }) => {
        wrapper.trigger('keyup.' + eventName);
        expect(mockedDispatch)
          .toHaveBeenLastCalledWith('setDirection', direction);
    });
  });
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
  // mock web3
  window.web3 = {};
  const wrapper = shallowMount(App, { localVue, store: Store });
  const errorMessage = wrapper.find('#validation-error');
  const wApp = wrapper.find({ name: 'Board' });
  expect(errorMessage.exists())
    .toBe(false);
  expect(wApp.exists())
    .toBe(true);

  const eth = expect.any(Eth);
  expect(mockedDispatch)
    .toHaveBeenCalledWith('run', eth);

  expect(Store.state.api.eth)
    .toEqual(eth);

  expect(wrapper.vm.isValid)
    .toBe(true);
});