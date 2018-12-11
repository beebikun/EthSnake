import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Store from '@/store';
import App from '@/App.vue';

const localVue = createLocalVue();
localVue.use(Vuex);


it('render without crashing', () => {
  const wrapper = shallowMount(App, { localVue, store: Store });
  expect(wrapper.vm.$store)
    .toBeInstanceOf(Object);
  expect(wrapper.vm.isValid)
    .toBe(false);

  const CollectedBlocks = wrapper.find({ name:  'CollectedBlocks' });
  expect(CollectedBlocks.exists())
    .toBe(true);
});


