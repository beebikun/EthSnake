import Vue from 'vue';
import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Store from '@/store';
import Robot from '@/components/GameBoard/Robot.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

const idx = '1';
const blockIdx = '10';
const BLOCK = {
  miner: 'miner',
  idx: blockIdx,
  number: '1',
};

function getWrapper() {
  Vue.set(Store.state.api.blocks, blockIdx, BLOCK);
  const propsData = { blockIdx, idx };
  const wrapper = shallowMount(Robot, { propsData, localVue, store: Store });

  return wrapper;
}

it('render without crashing', () => {
  const wrapper = getWrapper();
  expect(wrapper.vm.$store)
    .toBeInstanceOf(Object);
  expect(wrapper.vm.block)
    .toBe(BLOCK);
});

it('face', () => {
  const avatar = `url\\(https://robohash.org/${ BLOCK.miner }\\)`;
  const wrapper = getWrapper();
  const face = wrapper.find('.robot__face');
  expect(face.exists())
    .toBe(true);

  expect(face.attributes('style'))
      .toMatch(new RegExp(`background-image: ${ avatar };`));
});

it('idx element', () => {
  const wrapper = getWrapper();
  const element = wrapper.find('.robot__idx');
  expect()
  expect(element.text())
    .toEqual(blockIdx);
});

it('number element', () => {
  const wrapper = getWrapper();
  const element = wrapper.find('.robot__number');
  expect()
  expect(element.text())
    .toEqual(BLOCK.number);
});
