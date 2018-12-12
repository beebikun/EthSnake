<template>
  <div class="transactions-container"
       >

    <ToggleShowTransactionsButton />

    <h2> {{ block.number }} </h2>

    <StatsList
        v-for="transaction in block.transactions"
        :key="transaction.hash"
        :src="transaction"
        :items="getStatsItems(transaction)"
        :is-block-stats="false"
        />

  </div>
</template>

<script>
import { mapState } from 'vuex';
import ToggleShowTransactionsButton from './ToggleShowTransactionsButton.vue';
import StatsList from './StatsList.vue';


export default {
  name: 'BlockTransactions',
  components: {
    ToggleShowTransactionsButton,
    StatsList,
  },
  methods: {
    getStatsItems(transaction) {
      return [
        { key: 'transactionIndex', title: 'Transaction Index',
          value: transaction.transactionIndex },
        { key: 'value', title: 'Value' },
        { key: 'gasPrice', title: 'Gas Price' },
        { key: 'gas', title: 'Gas' },
      ];
    }
  },
  computed: {
    ...mapState({
      block: (state) => state.api.blocks[ state.api.showTransactionsIdx ] || {},
    }),
  },
};

</script>

<style scoped>
  .transactions-container {
    position: absolute;
    background: black;
    z-index: 10;
    right: 20px;
    height: 100%;
    overflow: scroll;
    width: 300px;
    padding-left: 20px;
  }
</style>
