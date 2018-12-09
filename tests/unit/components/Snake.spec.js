import Vue from 'vue';
import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Store from '@/store';
import Snake from '@/components/Snake.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

const BLOCKS = [
  { id: 'snake_0', idx: '1' },
  { id: 'snake_1', idx: '2' },
  { id: 'snake_2', idx: '3' },
];


function getWrapper() {
  Vue.set(Store.state.game.snake, 'blocks', BLOCKS);
  const wrapper = shallowMount(Snake, { localVue, store: Store });
  return wrapper;
}

it('render withoy crashing', () => {
  const wrapper = getWrapper();
  expect(wrapper.vm.$store)
    .toBeInstanceOf(Object);
  expect(wrapper.vm.blocks)
    .toBeInstanceOf(Array);
});

it('snake blocks', () => {
  const wrapper = getWrapper();
  expect(wrapper.vm.blocks)
    .toBe(BLOCKS);

  const items = wrapper.findAll({ name: 'SnakeBlock' });
  expect(items)
    .toHaveLength(BLOCKS.length);
  BLOCKS.forEach((block, i) => {
    const item = items.at(i);
    expect(item.props())
      .toEqual(block);
  });
});
