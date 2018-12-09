import { shallowMount } from '@vue/test-utils';
import BlockInfo from '@/components/BlockInfo.vue';

const block = {};

it('render without crashing', () => {
  shallowMount(BlockInfo, { propsData: { block } });
});
