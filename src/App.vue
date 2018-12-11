<template>
  <div id="app"
       tabindex="1"
       @keyup.up="setDirection('UP')"
       @keyup.down="setDirection('DOWN')"
       @keyup.right="setDirection('RIGHT')"
       @keyup.left="setDirection('LEFT')"
       @keyup.space="switchGameState()"
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
      this.$store.dispatch('run', eth);
    }
  },
  mounted: function () {
    this.$el.focus();
  },
  methods: {
    ...mapActions(['setDirection', 'switchGameState']),
  },
};

</script>

<style>
body, html {
  padding: 0;
  margin: 0;
}

#app {
  font-family: 'VT323', monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
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
