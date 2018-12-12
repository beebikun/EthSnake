import getWrapper from './utils';

it.each`
  isBlockStats | statsName
  ${ true }    | ${ 'blocksStats' }
  ${ false }   | ${ 'transStats' }
`('$statsName', ({ isBlockStats, statsName }) => {
  const existsKey = 'existsKey';
  const notExistsKey = 'notExistsKey';
  const expectedStats = { [ existsKey ]: true };
  const params = {
    [ statsName ]: expectedStats,
    isBlockStats
  };
  const wrapper = getWrapper(params);
  expect(wrapper.vm.stats)
    .toEqual(expectedStats);
  expect(wrapper.vm.isStat)
    .toBeInstanceOf(Function);
  expect(wrapper.vm.isStat(existsKey))
    .toBe(true);
  expect(wrapper.vm.isStat(notExistsKey))
    .toBe(false);
});
