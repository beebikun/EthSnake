import { shallowMount } from '@vue/test-utils';
import App from '@/App.vue';

it('render without crashing', () => {
  shallowMount(App);
});

it('renders validation error case', () => {
  // mock web3
  window.web3 = undefined;
  const wrapper = shallowMount(App);
  const errorMessage = wrapper.find('#validation-error');
  const wApp = wrapper.find({name: 'W3App'});
  expect(errorMessage.exists())
    .toBe(true);
  expect(wApp.exists())
    .toBe(false);
});

it('renders normal case', () => {
  // mock web3
  window.web3 = {};
  const wrapper = shallowMount(App);
  const errorMessage = wrapper.find('#validation-error');
  const wApp = wrapper.find({name: 'W3App'});
  expect(errorMessage.exists())
    .toBe(false);
  expect(wApp.exists())
    .toBe(true);
});