import Eth from 'web3-eth';
import actions from '@/store/api/actions';


it('add block', () => {
  const idx = '1';
  const block = { number: 1, gasLimit: 10, gasUsed: 4 };
  const commit = jest.fn();
  const dispatch = jest.fn();

  actions.addBlock({ commit, dispatch }, { block, idx });

  const expectedBlock = { ...block, idx, id: 'block_' + idx };
  expect(commit)
    .toHaveBeenCalledWith('addBlock', expectedBlock);
  expect(dispatch)
    .toHaveBeenCalledWith('addToken', idx);
});


it('set eth', () => {
  const eth = { hello: 'there' };
  const commit = jest.fn();
  const dispatch = jest.fn();

  actions.setEth({ commit, dispatch }, eth);

  expect(commit)
    .toHaveBeenCalledWith('setEth', eth);
  expect(dispatch)
    .toHaveBeenCalledWith('fetchBlocks');
});


it('fetch bocks', async () => {
  // mock state
  const p = Promise.resolve();
  const eth = new Eth(p);
  const state = { LOAD_BLOCKS_COUNT: 5, eth };
  const dispatch = jest.fn();

  actions.fetchBlocks({ dispatch, state });

  await p; // wait for fetch has been called

  expect(eth.getBlockNumber)
    .toHaveBeenCalledTimes(1);
  expect(eth.getBlock.request)
    .toHaveBeenCalledTimes(state.LOAD_BLOCKS_COUNT);
  expect(eth.BatchRequestAdd)
    .toHaveBeenCalledTimes(state.LOAD_BLOCKS_COUNT);
  expect(eth.BatchRequestExecute)
    .toHaveBeenCalledTimes(1);

  expect(dispatch)
    .toHaveBeenCalledTimes(state.LOAD_BLOCKS_COUNT);
  const expectedBlock = expect.objectContaining({
    idx: expect.any(Number),
    block: expect.any(Object),
  });
  expect(dispatch)
    .toHaveBeenCalledWith('addBlock', expectedBlock);
});
