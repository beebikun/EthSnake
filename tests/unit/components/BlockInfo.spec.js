import { shallowMount } from '@vue/test-utils';
import BlockInfo from '@/components/BlockInfo.vue';

window.web3 = {
  toAscii: jest.fn((value) => 'ascii:' + value),
};

const BLOCK = {
  id: 1,
  idx: '1',
  number: 1,
};

it('render without crashing', () => {
  const wrapper = shallowMount(BlockInfo, { propsData: { block: BLOCK } });
  expect(wrapper.name())
    .toEqual('BlockInfo');
});