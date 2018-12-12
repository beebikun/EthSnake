import Vue from 'vue';
import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Store from '@/store';
import CollectedBlocks from '@/components/CollectedBlocks.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

const BLOCKS = [
  { idx: '0', id: 'block0', number: 0, transactions: [] },
  { idx: '1', id: 'block1', number: 1, transactions: [] },
  { idx: '2', id: 'block2', number: 2, transactions: [] },
];

const TOKENS = {
  '10': BLOCKS[1].idx,
};

const FREE_BLOCKS = [ BLOCKS[0], BLOCKS[2] ];

beforeAll(() => {
  Vue.set(Store.state.api, 'blocks', BLOCKS);
  Vue.set(Store.state.game, 'tokens', TOKENS);
});

it('render without crashing', () => {
  const wrapper = shallowMount(CollectedBlocks, { localVue, store: Store });
  expect(wrapper.vm.$store)
    .toBeInstanceOf(Object);
  expect(wrapper.vm.blocks)
    .toEqual(FREE_BLOCKS);

  const stats = wrapper.findAll({ name: 'StatsList' });
  expect(stats)
    .toHaveLength(FREE_BLOCKS.length);

  const robots = wrapper.findAll({ name: 'Robot' });
  expect(robots)
    .toHaveLength(FREE_BLOCKS.length);
});


it('statsItems', () => {
  const block = {
    id: 'block1',
    idx: 1,
    number: 1,
    timestamp: 1429287689,
    transactions: [1, 2, 3]
  };
  const wrapper = shallowMount(CollectedBlocks, { localVue, store: Store });
  const statsItems = wrapper.vm.statsItems(block);
  expect(statsItems)
    .toEqual([
    { key: 'timestamp', title: 'Time', value: '17/4 17:21:29' },
    { key: 'difficulty', title: 'Difficulty' },
    { key: 'totalDifficulty', title: 'Total Difficulty' },
    { key: 'size', title: 'Size' },
    { key: 'gasLimit', title: 'Gas Limit' },
    { key: 'gasUsed', title: 'Gas Used' },
    { key: 'transactions', title: 'Transactions',
      value: block.transactions.length,
      transactionsToggleIdx: block.idx },
  ]);
});
