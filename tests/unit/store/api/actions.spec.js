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
    .toHaveBeenNthCalledWith(1, 'addBlock', expectedBlock);
  expect(commit)
    .toHaveBeenNthCalledWith(2, 'addStats', expectedBlock);
  expect(dispatch)
    .toHaveBeenCalledWith('addToken', idx);
});


describe('set eth', () => {
  it('set when no eth was set', () => {
    const eth = { hello: 'there' };
    const commit = jest.fn();
    const dispatch = jest.fn();
    const state = {};

    actions.setEth({ commit, dispatch, state }, eth);

    expect(commit)
      .toHaveBeenCalledWith('setEth', eth);
    expect(dispatch)
      .toHaveBeenCalledWith('fetchBlocks');
  });
  it('do not set twice', () => {
    const eth = { hello: 'there' };
    const commit = jest.fn();
    const dispatch = jest.fn();
    const state = { eth: 'something' };

    actions.setEth({ commit, dispatch, state }, eth);

    expect(commit)
      .not.toHaveBeenCalled();
    expect(dispatch)
      .not.toHaveBeenCalled();
  });
});


describe('fetch bocks', () => {
  it('normal blocks', async () => {
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

  it('empty block', async () => {
    const p = Promise.resolve();
    const eth = new Eth(p);
    eth.buildBlock.mockReturnValueOnce(null);
    const state = { LOAD_BLOCKS_COUNT: 1, eth };
    const dispatch = jest.fn();

    actions.fetchBlocks({ dispatch, state });

    await p; // wait for fetch has been called

    expect(dispatch)
      .not.toHaveBeenCalled();
  });
});
