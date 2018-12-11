<template>
  <div id="transactions"
       >

    <div>
      <span @click="showTransactions(null)"
            class="toggleShowTransactions">CLOSE</span>
    </div>

    <h2> {{ block.number }} </h2>

    <dl class="block-info"
        v-for="transaction in block.transactions"
        :key='transaction.hash'>
      <dt>Transaction Index:</dt>
        <dd>
          {{ transaction.transactionIndex }}
        </dd>
      <dt>Value:</dt>
        <dd>
          <div class="stats" :style="barWidth(transaction, 'value')"> </div>
          <span class="info">{{ transaction.value }}</span>
        </dd>
      <dt>Gas Price:</dt>
        <dd>
          <div class="stats" :style="barWidth(transaction, 'gasPrice')"> </div>
          <span class="info">{{ transaction.gasPrice }}</span>
        </dd>
      <dt>Gas:</dt>
        <dd>
          <div class="stats" :style="barWidth(transaction, 'gas')"> </div>
          <span class="info">{{ transaction.gas }}</span>
        </dd>
    </dl>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';


export default {
  name: 'BlockTransactions',
  methods: {
    ...mapActions(['showTransactions']),
    getStatsValue(transaction, name) {
      const value = transaction[name];
      const { min, max } = this.transStats[name];
      const d = max - min;
      const v = value - min;
      return (v * 100 / d);
    },
    barWidth(transaction, name) {
      const { min, max } = this.transStats[name];
      const value = this.getStatsValue(transaction, name)
      return {
        width: value.toFixed(1) + '%',
      }
    },
  },
  computed: {
    ...mapState({
      transStats: (state) => state.api.transStats,
      block: (state) => state.api.blocks[ state.api.showTransactionsIdx ] || {},
    }),
  },
};

</script>

<style scoped>

  #transactions {
    position: absolute;
    background: black;
    z-index: 10;
    right: 20px;
    height: 100%;
    overflow: scroll;
    width: 300px;
  }

  h2 {
    margin: 8px 0;
  }

  .block-info {
    margin: 0;
    border-bottom: 1px solid;
    padding-bottom: 7px;
    margin-left: 7px;
    width: 100%;
    max-width: 100%;
    word-break: break-all;
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
