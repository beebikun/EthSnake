<template>
  <div class="block"
      :style="tile.style"
      :class="{'pending': isPending}"
      >
    <div class="bg" :style="{'background-image': avatar}" ></div>
    <div class="chars">
      <div class="gasUsed" :style="usedHeight"></div>
      <div class="idx"> {{ block.idx }} </div>
    </div>
    <div class="name"> {{ block.number }} </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Token',
  props: {
    blockIdx: String,
    idx: String,
  },
  computed: {
    ...mapState({
      tile: function (state) { return state.game.tiles[this.idx]; },
      block: function (state) { return state.api.blocks[this.blockIdx]; },
    }),
    avatar: function () {
      const url = `https://robohash.org/${ this.block.miner }`;
      return `url(${ url })`;
    },
    usedHeight: function () {
      const max = this.block.gasLimit;
      const value = this.block.gasUsed;
      return {
        height: (value * 100 / max).toFixed(1) + '%',
      };
    },
    isPending: function () { return this.block.number === null; },
  },
};

</script>

<style scoped>
  .block {
    position: relative;
    box-sizing: content-box;
    position: absolute;
    z-index: 10;
    font-size: 9px;
    font-family: monospace;
    font-weight: bold;
    color: #444;
  }
  .bg {
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
    right: 3px;
    top: 3px;
    left: 10px;
    bottom: 10px;
  }
  .pending {
    background-color: rgba(10, 10, 10, .5);
  }
  .chars {
    position: absolute;
    top: 3px;
    left: 3px;
    bottom: 3px;
    width: 4px;
    background-color: rgba(10, 10, 10, .7);
    border: 2px solid gray;
  }
  .idx:before, .idx {
    border-radius: 100%;
  }
  .idx {
    position: absolute;
    border: 2px solid gray;
    background-color: azure;
    top: -3px;
    left: -4.5px;
    width: 10px;
    height: 10px;
    text-align: center;
  }
  .gasUsed {
    position: absolute;
    width: 4px;
    min-height: 15%;
    bottom: 0;
    left: 0;
    background-color: rgba(1, 255, 232, 1);
  }
  .name {
    position: absolute;
    bottom: 3px;
    right: 3px;
    background: black;
    color: lawngreen;
    font-size: 8px;
    padding: 0 1px;
  }
</style>
