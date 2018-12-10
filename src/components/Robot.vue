<template>
  <div class="robot">
    <div class="robot__face" :style="{'background-image': avatar}" ></div>
    <div class="robot__idx"> {{ block.idx }} </div>
    <div class="robot__number"> {{ block.number }} </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Robot',
  props: {
    blockIdx: String,
  },
  computed: {
    ...mapState({
      block: function (state) { return state.api.blocks[this.blockIdx]; },
    }),
    avatar: function () {
      const url = `https://robohash.org/${ this.block.miner }`;
      return `url(${ url })`;
    },
  },
};

</script>

<style scoped>
  .block {
    width: 100%;
    height: 100%;
    z-index: 10;
    font-size: 9px;
    font-family: monospace;
    font-weight: bold;
    color: #444;
  }
  .robot__face {
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
    right: 3px;
    top: -3px;
    left: 9px;
    bottom: 9px;
  }
  .robot__idx {
    border-radius: 100%;
    position: absolute;
    border: 2px solid gray;
    background-color: black;
    top: 1px;
    left: -1px;
    width: 16px;
    height: 16px;
    font-size: 17px;
    font-weight: bold;
    line-height: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .robot__number {
    position: absolute;
    bottom: 2px;
    right: 2px;
    background: black;
    padding: 0 2px 1px;
    font-size: 13px;
  }
</style>
