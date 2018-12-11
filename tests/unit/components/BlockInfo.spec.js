import Vue from 'vue';
import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Store from '@/store';
import BlockInfo from '@/components/BlockInfo.vue';

const localVue = createLocalVue();
localVue.use(Vuex);


const BLOCK = {
  id: 1,
  idx: '1',
  number: 1,
  timestamp: 1429287689,
  difficulty: 10,
  totalDifficulty: 100,
  size: 30,
  gasLimit: 180,
  gasUsed: 200,
  transactions: [1, 2, 3]
};
const blocksStats = {
  difficulty: { min: 10, max: 200 },
  totalDifficulty: { min: 10, max: 200 },
  size: { min: 10, max: 200 },
  gasLimit: { min: 10, max: 200 },
  gasUsed: { min: 10, max: 200 },
  transactions: { min: 1, max: 5 },
};

const elements = [
  [ 'Time:', '17/4 17:21:29' ],
  [ 'Difficulty:', BLOCK.difficulty, '0.0' ],
  [ 'Total Difficulty:', BLOCK.totalDifficulty, '47.4' ],
  [ 'Size:', BLOCK.size, '10.5' ],
  [ 'Gas Limit:', BLOCK.gasLimit, '89.5' ],
  [ 'Gas Used:', BLOCK.gasUsed, '100.0' ],
  [ 'Transactions: SHOW', 3, '50.0' ],
];

Vue.set(Store.state.api, 'blocksStats', blocksStats);
const propsData = { block: BLOCK };
const wrapper = shallowMount(BlockInfo, { propsData, localVue, store: Store } );
const dts = wrapper.findAll('dt');
const dds = wrapper.findAll('dd');

it('render without crashing', () => {
  expect(wrapper.vm.blocksStats)
    .toEqual(blocksStats);
  expect(dts).toHaveLength(elements.length);
  expect(dds).toHaveLength(elements.length);
});

elements.forEach(([title, value, percent], idx) => {
  it(title, () => {
    const dt = dts.at(idx);
    expect(dt.text()).toEqual(title);
    const dd = dds.at(idx);
    expect(dd.text()).toEqual(value.toString());
    const bar = dd.find('.stats');
    if (percent === undefined) {
      expect(bar.exists())
        .toBe(false);
    } else {
      expect(bar.exists())
        .toBe(true);
      expect(bar.attributes('style'))
        .toEqual(`width: ${ percent }%;`);
    }
  });
});

it('showTransactions', () => {
  const mockedDispatch = jest.spyOn(Store, 'dispatch');
  const showTransactions = wrapper.find('.toggleShowTransactions');

  expect(wrapper.vm.showTransactions)
    .toBeInstanceOf(Function);

  showTransactions.trigger('click');

  expect(mockedDispatch)
    .toHaveBeenCalledWith('showTransactions', BLOCK.idx);
});
