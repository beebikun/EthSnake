import Vue from 'vue';
import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Store from '@/store';
import Token from '@/components/Token.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

const idx = '1';
const blockIdx = '1';
const TILE = Store.state.game.tiles[idx];
const BLOCK = {
  miner: 'miner',
  number: 1,
};

function getWrapper(block = BLOCK) {
  Vue.set(Store.state.api.blocks, blockIdx, block);
  const propsData = { blockIdx, idx };
  const wrapper = shallowMount(Token, { propsData, localVue, store: Store });

  return wrapper;
}

it('render without crashing', () => {
  const wrapper = getWrapper();
  expect(wrapper.vm.$store)
    .toBeInstanceOf(Object);
  expect(wrapper.vm.tile)
    .toBe(TILE);
});

describe('pending state', () => {
  it('normal block', () => {
    const wrapper = getWrapper();
    expect(wrapper.vm.isPending)
      .toBe(false);
    expect(wrapper.classes('pending'))
      .toBe(false);
  });

  it('pending block', () => {
    const wrapper = getWrapper({ ...BLOCK, number: null });
    expect(wrapper.vm.isPending)
      .toBe(true);
    expect(wrapper.classes('pending'))
      .toBe(true);
  });
});

it('bg', () => {
  const avatar = `url\\(https://robohash.org/${ BLOCK.miner }\\)`;
  const wrapper = getWrapper();
  const bg = wrapper.find('.bg');
  expect(bg.exists())
    .toBe(true);

  expect(bg.attributes('style'))
      .toMatch(new RegExp(`background-image: ${ avatar };`));
});

describe('block style', () => {
  const wrapper = getWrapper();
  const style = wrapper.attributes('style');

  it.each`
    name                    | value
    ${ 'left' }             | ${ TILE.style.left }
    ${ 'top' }              | ${ TILE.style.top }
    ${ 'width' }            | ${ TILE.style.width }
    ${ 'height' }           | ${ TILE.style.height }
  `('expect $name to be $value', expectStyle);

  function expectStyle({ name, value }) {
    expect(style)
      .toMatch(new RegExp(`${ name }: ${ value };`));
  }
});
