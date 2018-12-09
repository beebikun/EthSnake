<template>
  <div id="app">
    <W3App :eth="eth" v-if="eth" />
    <div id="validation-error" v-else >
      Sorry, you have to use MetaMask 🦊
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import Eth from 'web3-eth';
import W3App from './components/W3App.vue'

export default
@Component({
  components: {
    W3App
  }
})
class App extends Vue {
  created() {
    if (typeof web3 !== 'undefined') {
      this.eth = new Eth(web3.currentProvider);
    }
  }
}
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
