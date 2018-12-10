<template>
  <div class="bg-tile" :style="tile.style">
    {{ tile.idx }}
  </div>

</template>

<script>

export default {
  name: 'BgTile',
  props: {
    tile: Object
  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bg-tile {
    background-image: radial-gradient(rgba(3, 134, 3, 0.5), rgba(0, 174, 0, 1));
    border: 3px solid #00de00;
    width: 64px;
    height: 64px;
    position: absolute;
    z-index: 0;
    box-sizing: border-box;
  }
  .bg-tile:after {
    content: '';
    display: block;
    position: absolute;
    border: 1px solid black;
    left: -3px;
    right: -3px;
    top:-3px;
    bottom: -3px;
  }
</style>
