import Vue from 'vue';
import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Store from '@/store';
import CollectedBlocks from '@/components/CollectedBlocks.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

const BLOCKS = [
  { id: '0', idx: 'block0', number: 0 },
  { id: '1', idx: 'block1', number: 1 },
  { id: '2', idx: 'block2', number: 2 },
];

const TOKENS = {
  '10': BLOCKS[1].idx,
};

const FREE_BLOCKS = [ BLOCKS[0], BLOCKS[2] ];

it('render without crashing', () => {
  Vue.set(Store.state.api, 'blocks', BLOCKS);
  Vue.set(Store.state.game, 'tokens', TOKENS);

  const wrapper = shallowMount(CollectedBlocks, { localVue, store: Store });
  expect(wrapper.vm.$store)
    .toBeInstanceOf(Object);
  expect(wrapper.vm.blocks)
    .toEqual(FREE_BLOCKS);

  const infoItems = wrapper.findAll({ name: 'BlockInfo' });
  expect(infoItems)
    .toHaveLength(FREE_BLOCKS.length);

  const robots = wrapper.findAll({ name: 'Robot' });
  expect(robots)
    .toHaveLength(FREE_BLOCKS.length);
});