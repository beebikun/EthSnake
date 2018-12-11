<template>
  <div id="transactions"
       >

    <span @click="showTransactions(null)"
          class="toggleShowTransactions">CLOSE</span>

    <dl class="block-info"
        v-for="transaction in block.transactions"
        :key='transaction.hash'>
      <dt>transactionIndex:</dt>
          <dd>
            {{ transaction.transactionIndex }}
          </dd>
      <!-- <dt>from:</dt>
          <dd>
            {{ transaction.from }}
          </dd>
      <dt>to:</dt>
          <dd>
            {{ transaction.to }}
          </dd> -->
      <dt>value:</dt>
          <dd>
            {{ transaction.value }}
          </dd>
      <dt>input:</dt>
          <dd>
            {{ transaction.input }}
          </dd>
      <dt>gasPrice:</dt>
          <dd>
            {{ transaction.gasPrice }}
          </dd>
      <dt>gas:</dt>
          <dd>
            {{ transaction.gas }}
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
  },
  computed: {
    ...mapState({
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

  .block-info {
    margin: 0;
    border-bottom: 1px solid;
    padding-bottom: 7px;
    margin-left: 7px;
    width: 100%;
    max-width: 100%;
    word-break: break-all;
  }
</style>
