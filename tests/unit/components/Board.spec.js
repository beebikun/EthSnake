import Vue from 'vue';
import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Board from '@/components/Board.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

const LOAD_BLOCKS_COUNT = 3;
const TILES_COUNT = LOAD_BLOCKS_COUNT * 2;
const SIZE = { w: 3, h: 4, side: 10 };

it('render without crashing', () => {
  const store = getStore();
  const wrapper = shallowMount(Board, { localVue, store });

  expect(wrapper.vm.$store)
    .toBeInstanceOf(Object);
  expect(wrapper.vm.tokens)
    .toBe(store.state.game.tokens);
  expect(wrapper.vm.tiles)
    .toBe(store.state.game.tiles);
});

it('render tokens', async () => {
  const store = getStore();
  const wrapper = shallowMount(Board, { localVue, store });

  await store.dispatch('fetchBlocks');

  expect(Object.keys(wrapper.vm.tokens))
    .toHaveLength(LOAD_BLOCKS_COUNT);
  const items = wrapper.findAll({ name: 'Token' });
  expect(items)
    .toHaveLength(LOAD_BLOCKS_COUNT);

  Object.keys(wrapper.vm.tokens)
    .forEach((idx, i) => {
      const item = items.at(i);
      expect(item.props())
        .toEqual({ idx, blockIdx: idx });
    });
});

it('render bg tiles', () => {
  const store = getStore();
  const wrapper = shallowMount(Board, { localVue, store });

  expect(wrapper.vm.tiles)
    .toHaveLength(TILES_COUNT);

  const items = wrapper.findAll({ name: 'BgTile' });
  expect(items)
    .toHaveLength(TILES_COUNT);
});

it('render snake', () => {
  const store = getStore();
  const wrapper = shallowMount(Board, { localVue, store });

  const snake = wrapper.find({ name: 'Snake' });
  expect(snake.exists())
    .toBe(true);
});

describe('board size', () => {
  const store = getStore();
  const wrapper = shallowMount(Board, { localVue, store });
  const style = wrapper.attributes('style');

  it.each`
    name         | value
    ${ 'width' } | ${ SIZE.w * SIZE.side }
    ${ 'height' }| ${ SIZE.h * SIZE.side }
  `('expect $name to be $value', expectStyle);

  function expectStyle({ name, value }) {
    expect(style)
      .toMatch(new RegExp(`${ name }: ${ value }px;`));
  }
  });

function getStore() {
  const actions = {
    fetchBlocks: ({ state, rootState }) => {
      const blocks = Array(LOAD_BLOCKS_COUNT).fill()
        .map((_, i) => ({ number: i, id: 'block' + i, idx: i.toString() }));
      Vue.set(state, 'blocks', blocks);

      const tokens = blocks.reduce((bucket, block) => {
        bucket[block.idx] = block.idx;
        return bucket;
      }, {});
      Vue.set(rootState.game, 'tokens', tokens);

      return Promise.resolve();
    },
  };

  const tiles = Array(TILES_COUNT).fill()
      .map((_, i) => ({ id: 'tile' + i }))

  return new Vuex.Store({
    modules: {
      api: {
        state: { LOAD_BLOCKS_COUNT, blocks: [], },
        actions,
      },
      game: {
        state: { SIZE, tiles, tokens: {} },
      },
    },
  });
}

