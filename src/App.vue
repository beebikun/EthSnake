<template>
  <div id="app">
    <Board v-if="isValid" />
    <div id="validation-error" v-else >
      Sorry, you have to use MetaMask 🦊
    </div>
  </div>
</template>

<script>
import Eth from 'web3-eth';
import Board from './components/Board.vue';

export default {
  name: 'App',
  data: () => ({ isValid: false }),
  components: {
    Board
  },
  created: function () {
    if (typeof web3 !== 'undefined') {
      const eth = new Eth(web3.currentProvider);
      this.isValid = true;
      this.$store.dispatch('drawSnake');
      this.$store.dispatch('setEth', eth);
    }
  }
};

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  justify-content: center;
  background: black;
}
</style>
