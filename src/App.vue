<template>
  <div id="app"
       tabindex="1"
       @keyup.up="setDirection('UP')"
       @keyup.down="setDirection('DOWN')"
       @keyup.right="setDirection('RIGHT')"
       @keyup.left="setDirection('LEFT')"
       @keyup.space="togglePause()"
       >
    <Board v-if="isValid" />
    <div id="validation-error" v-else >
      Sorry, you have to use MetaMask 🦊
    </div>
  </div>
</template>

<script>
import Eth from 'web3-eth';
import { mapActions } from 'vuex';
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
      this.$store.dispatch('initSnake');
      this.$store.dispatch('setEth', eth);
    }
  },
  mounted: function () {
    this.$el.focus();
  },
  methods: {
    ...mapActions(['setDirection', 'togglePause']),
  },
};

</script>

<style>
#app {
  font-family: monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  justify-content: center;
  background: black;
}
</style>
