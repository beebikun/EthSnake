<template>
  <div id="app"
       tabindex="1"
       @keyup.up="setDirection('UP')"
       @keyup.down="setDirection('DOWN')"
       @keyup.right="setDirection('RIGHT')"
       @keyup.left="setDirection('LEFT')"
       @keyup.space="switchGameState()"
       @click="pause()"
       >

    <GameBoard v-if="isValid" />
    <div id="validation-error" v-else >
      Sorry, you have to use MetaMask 🦊
    </div>

    <CollectedBlocks />
    <BlockTransactions v-if="showTransactions" />
  </div>
</template>

<script>
import Eth from 'web3-eth';
import { mapActions, mapState } from 'vuex';
import GameBoard from './components/GameBoard/index.vue';
import CollectedBlocks from './components/CollectedBlocks.vue';
import BlockTransactions from './components/BlockTransactions.vue';

export default {
  name: 'App',
  data: () => ({ isValid: false }),
  components: {
    GameBoard,
    CollectedBlocks,
    BlockTransactions,
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
    pause: function () {
      const { game } = this.$store.state;
      if (game.STATE === game.STATES.RUN) {
        this.$store.dispatch('pause');
      }
    }
  },
  computed: {
    ...mapState({
      showTransactions: state => state.api.showTransactionsIdx,
    })
  }
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

  padding: 10px;
  padding-left: 20px;

  background: black;
  color: lawngreen;

  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
  display: flex;
  width: 100%;
}
</style>
