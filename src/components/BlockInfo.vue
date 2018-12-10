<template>
<dl class="block-info">
    <dt>Time:</dt>
        <dd>
          {{ timestamp }}
        </dd>
    <dt>Difficulty:</dt>
        <dd>
          <div class="stats" :style="barWidth('difficulty')"> </div>
          <span class="info">{{ block.difficulty }}</span>
        </dd>
    <dt>Total Difficulty:</dt>
        <dd>
          <div class="stats" :style="barWidth('totalDifficulty')"> </div>
          <span class="info">{{ block.totalDifficulty }}</span>
        </dd>
    <dt>Size:</dt>
        <dd>
          <div class="stats" :style="barWidth('size')"> </div>
          <span class="info">{{ block.size }}</span>
        </dd>
    <dt>Gas Limit:</dt>
        <dd>
          <div class="stats" :style="barWidth('gasLimit')"> </div>
          <span class="info">{{ block.gasLimit }}</span>
        </dd>
    <dt>Gas Used:</dt>
        <dd>
          <div class="stats" :style="barWidth('gasUsed')"> </div>
          <span class="info">{{ block.gasUsed }}</span>
        </dd>
    <dt>Transactions:</dt>
        <dd>
          <div class="stats" :style="barWidth('transactions')"> </div>
          <span class="info">{{ block.transactions.length }}</span>
        </dd>
</dl>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'BlockInfo',
  props: {
    block: Object
  },
  methods: {
    getStatsValue(name) {
      const value = name === 'transactions' ?
                      this.block.transactions.length :
                      this.block[name];
      const { min, max } = this.blocksStats[name];
      const d = max - min;
      const v = value - min;
      return (v * 100 / d).toFixed(1);
    },
    barWidth(name) {
      return {
        width: this.getStatsValue(name) + '%',
      }
    },
  },
  computed: {
    ...mapState({
      blocksStats: (state) => state.api.blocksStats,
    }),
    timestamp: function () {
      const dt = new Date(this.block.timestamp * 1000);
      const date = `${ dt.getDate() }/${ dt.getMonth() + 1 }`;
      const time = `${dt.getHours()}:${ dt.getMinutes() }:${ dt.getSeconds() }`;
      return `${ date } ${ time }`;
    }
  }
};

</script>

<style scoped>
  .block-info {
    margin: 0;
    border-bottom: 1px solid;
    padding-bottom: 7px;
    margin-left: 7px;
    width: 100%;
  }

  dd {
    position: relative;
  }

  .info {
    position: relative;
    z-index: 10;
  }

  .stats {
    position: absolute;
    left: 0;
    height: 100%;
    top: 0;
    background: darkslategray;
    min-width: 4px;
  }
</style>
