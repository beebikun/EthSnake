// import Vue from 'vue';
import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Store from '@/store';
import SnakeBlock from '@/components/SnakeBlock.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

const idx = '10';
const TILE = Store.state.game.tiles[idx];


function getWrapper() {
  // Vue.set(Store.state.game.snake, 'blocks', BLOCKS);
  const propsData = { id: 'snake_0', idx };
  const wrapper = shallowMount(SnakeBlock, { propsData, localVue, store: Store });
  return wrapper;
}

it('render withoy crashing', () => {
  const wrapper = getWrapper();
  expect(wrapper.vm.$store)
    .toBeInstanceOf(Object);
  expect(wrapper.vm.tile)
    .toBe(TILE);
});


describe('tile style', () => {
  const wrapper = getWrapper();
  const style = wrapper.attributes('style');

  it.each`
    name         | value
    ${ 'left' }  | ${ TILE.style.left }
    ${ 'top' }   | ${ TILE.style.top }
    ${ 'width' } | ${ TILE.style.width }
    ${ 'height' }| ${ TILE.style.height }
  `('expect $name to be $value', expectStyle);

  function expectStyle({ name, value }) {
    expect(style)
      .toMatch(new RegExp(`${ name }: ${ value };`));
  }
});
