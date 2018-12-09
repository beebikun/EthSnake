<template>
  <div class="block">
  </div>

</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

export default
@Component({
  props: {
    block: Object,
  },
})
class BgBlock extends Vue {
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .block {
    background-image: radial-gradient(rgba(3, 134, 3, 0.5), rgba(0, 174, 0, 1));
    border: 3px solid #00de00;
    width: 64px;
    height: 64px;
    position: relative;
    z-index: 0;
    box-sizing: border-box;
  }
  .block:after {
    content: '';
    display: block;
    position: absolute;
    border: 1px solid black;
    left: -3px;
    right: -3px;
    top:-3px;
    bottom: -3px;
  }
  .pending {
  }
</style>
