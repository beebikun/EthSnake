import getWrapper from './utils';

const ITEM_VALUE = 15;
const SRC_VALUE = 20;
const BAD_SRC = [ { SRC_VALUE } ];
const STATS_VALUE = { min: 10, max: 30 };
const noWidth = { isStat: false, width: '' };
const withWidth = { isStat: true, width: { width: '50.0%' }, value: SRC_VALUE };
const withWidthFromItem = { isStat: true, width: { width: '25.0%' }, value: ITEM_VALUE };

it.each`
  itemValue       | srcValue       | statsValue       | expectedItem
  ${ ITEM_VALUE } | ${ SRC_VALUE } | ${ undefined }   | ${ { ...noWidth, value: ITEM_VALUE  } }
  ${ undefined }  | ${ SRC_VALUE } | ${ undefined }   | ${ { ...noWidth, value: SRC_VALUE  } }
  ${ undefined }  | ${ SRC_VALUE } | ${ STATS_VALUE } | ${ withWidth }
  ${ ITEM_VALUE } | ${ SRC_VALUE } | ${ STATS_VALUE } | ${ withWidth }
  ${ ITEM_VALUE } | ${ BAD_SRC }   | ${ STATS_VALUE } | ${ withWidthFromItem }

`('Item $itemValue + Src $srcValue + Stats $statsValue => $expectedItem',
  ({ itemValue, srcValue, statsValue, expectedItem }) => {
    const key = 'KEY';
    const title = 'TITLE';
    const src = {
      [ key ]: srcValue,
    };
    const items = [
      { key, title, value: itemValue }
    ];
    const blocksStats = {
      [ key ]: statsValue,
    };
    const expected = [
      { key, title, ...expectedItem },
    ];

    const wrapper = getWrapper({ src, blocksStats, items });
    expect(wrapper.vm.infoBlocks)
      .toMatchObject(expected);
  });