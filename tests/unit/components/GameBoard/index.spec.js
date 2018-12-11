import Vue from 'vue';
import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import GameBoard from '@/components/GameBoard/index.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

const LOAD_BLOCKS_COUNT = 3;
const TILES_COUNT = LOAD_BLOCKS_COUNT * 2;
const SIZE = { w: 3, h: 4, side: 10 };


it('render without crashing', () => {
  const store = getStore();
  const wrapper = shallowMount(GameBoard, { localVue, store });

  expect(wrapper.vm.$store)
    .toBeInstanceOf(Object);
  expect(wrapper.vm.tokens)
    .toBe(store.state.game.tokens);
  expect(wrapper.vm.tiles)
    .toBe(store.state.game.tiles);
});

describe('board size', () => {
  const store = getStore();
  const wrapper = shallowMount(GameBoard, { localVue, store });
  const BOARD_SIZE = {
    width: SIZE.w * SIZE.side,
    height: SIZE.h * SIZE.side,
  };

  it('GameBoard width', () => {
    expect(wrapper.vm.width)
      .toMatch(BOARD_SIZE.width + 'px');
    expect(wrapper.vm.height)
      .toMatch(BOARD_SIZE.height + 'px');
    const style = wrapper.attributes('style');
    styleMatch(style, 'width');
  });

  it('game container', () => {
    const container = wrapper.find('.game__board');
    expect(container.exists())
      .toBe(true);
    const style = container.attributes('style');
    styleMatch(style, 'height');
  });

  function styleMatch(style, name) {
    const value = BOARD_SIZE[name];
    const r = new RegExp(`${ name }: ${ value }px;`);
    expect(style)
      .toMatch(r);
  }

});

it('render tokens', async () => {
  const store = getStore();
  const wrapper = shallowMount(GameBoard, { localVue, store });

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
        .toEqual({ idx, blockIdx: wrapper.vm.tokens[idx] });
    });
});

it('render bg tiles', () => {
  const store = getStore();
  const wrapper = shallowMount(GameBoard, { localVue, store });

  expect(wrapper.vm.tiles)
    .toHaveLength(TILES_COUNT);

  const items = wrapper.findAll({ name: 'BgTile' });
  expect(items)
    .toHaveLength(TILES_COUNT);
});

it('render Snake', () => {
  const store = getStore();
  const wrapper = shallowMount(GameBoard, { localVue, store });

  const element = wrapper.find({ name: 'Snake' });
  expect(element.exists())
    .toBe(true);
});

describe('PauseScreen', () => {
  const store = getStore();
  const wrapper = shallowMount(GameBoard, { localVue, store });

  it.each`
    gameState    | isExists
    ${ 'RUN' }   | ${ false }
    ${ 'PAUSE' } | ${ true }
  `('Game is $gameState => Sreen exists: $isExists', ({ gameState, isExists }) => {
      Vue.set(store.state.game, 'STATE', gameState);
      const element = wrapper.find({ name: 'PauseScreen' });
      expect(element.exists())
        .toBe(isExists);
  });
});


function getStore() {
  const actions = {
    fetchBlocks: ({ state, rootState }) => {
      const blocks = Array(LOAD_BLOCKS_COUNT).fill()
        .map((_, i) => ({ number: i, id: 'block' + i, idx: i }));
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
        state: { SIZE, tiles, tokens: {}, STATE: 'RUN', STATES: { RUN: 'RUN' } },
      },
    },
  });
}

