import getWrapper from './utils';

it.each`
  value     | expected
  ${ 10 }   | ${ '0.0' }
  ${ 30 }   | ${ '10.5' }
  ${ 100 }  | ${ '47.4' }
  ${ 180 }  | ${ '89.5' }
  ${ 200 }  | ${ '100.0' }
`(`barWidth: $value => $expected`, ({ value, expected }) => {
  const key = 'key';
  const blocksStats = {
    [ key ]: { min: 10, max: 200 },
  };
  const wrapper = getWrapper({ blocksStats });
  expect(wrapper.vm.barWidth)
    .toBeInstanceOf(Function);
  const barWidth = wrapper.vm.barWidth(key, value);
  expect(barWidth)
    .toEqual({ width: expected + '%' });
});
