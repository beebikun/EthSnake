<template>
  <span @click="showTransactions(blockIdx)"
      class="toggleShowTransactions">
    {{ blockIdx ? 'SHOW' : 'HIDE' }}
  </span>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'ToggleShowTransactionsButton',
  props: [ 'blockIdx' ],
  methods: {
    ...mapActions(['showTransactions']),
  },
};

</script>

<style scoped>
  .toggleShowTransactions {
    cursor: pointer;
    position: relative;
    display: inline-block;
    padding: 0 8px;
    color: red;
  }
  .toggleShowTransactions:before {
    display: block;
    position: absolute;
    content: '[';
    left: 0;
    top: 0;
  }
  .toggleShowTransactions:after {
    display: block;
    position: absolute;
    content: ']';
    right: 0;
    top: 0;
  }
  .toggleShowTransactions:hover {
    text-decoration: underline;
  }
  .toggleShowTransactions:hover:before {
    left: -2px;
  }
  .toggleShowTransactions:hover:after {
    right: -2px;
  }
</style>
