const STATS_KEYS = [
  'difficulty',
  'totalDifficulty',
  'size',
  'gasLimit',
  'gasUsed',
];

const blocksStats = STATS_KEYS.reduce((bucket, name) => {
  bucket[name] = getDefaultRange();
  return bucket;
}, { transactions: getDefaultRange() });

function getDefaultRange() {
  return {
    min: Number.MAX_SAFE_INTEGER,
    max: Number.MIN_SAFE_INTEGER,
  };
}

export default {
  LOAD_BLOCKS_COUNT: 10,
  STATS_KEYS,

  eth: null,
  blocks: [],
  blocksStats,
  showTransactionsIdx: null,
};
