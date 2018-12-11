const STATS_KEYS = [
  'difficulty',
  'totalDifficulty',
  'size',
  'gasLimit',
  'gasUsed',
];
const TRANS_STATS_KEYS = [
  'value', 'gasPrice', 'gas',
];

const blocksStats = getStatsFromFields(STATS_KEYS, { transactions: getDefaultRange() });
const transStats = getStatsFromFields(TRANS_STATS_KEYS);


export default {
  LOAD_BLOCKS_COUNT: 10,
  STATS_KEYS, TRANS_STATS_KEYS,

  eth: null,
  blocks: [],
  blocksStats, transStats,
  showTransactionsIdx: null,
};



function getStatsFromFields( fields, initStats={} ) {
  return fields.reduce((bucket, name) => {
    bucket[name] = getDefaultRange();
    return bucket;
  }, initStats );
}

function getDefaultRange() {
  return {
    min: Number.MAX_SAFE_INTEGER,
    max: Number.MIN_SAFE_INTEGER,
  };
}