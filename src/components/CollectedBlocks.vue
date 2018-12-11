<template>
  <div id="collected"
       >
    <h1 class="header"> Collected blocks: </h1>

    <div v-for="block in blocks"
         :key="block.id"
         class="collected-blocks"
         >
      <div class="collected-blocks__robot" >
        <Robot :block-idx="block.idx" />
      </div>
      <BlockInfo :block="block" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Robot from './GameBoard/Robot.vue';
import BlockInfo from './BlockInfo.vue';


export default {
  name: 'CollectedBlocks',
  components: {
    BlockInfo,
    Robot,
  },
  computed: {
    ...mapGetters({ blocks: 'getCollected' }),
  }
};

</script>

<style scoped>
  #collected {
    padding: 0 20px;
    max-height: 100%;
    overflow: scroll;
    flex: 1 0 auto;
  }

  .collected-blocks {
    display: flex;
    margin-bottom: 10px;
  }

  .collected-blocks__robot {
    position: relative;
    width: 64px;
    height: 64px;
  }

  .header {
    color: lawngreen;
    width: 100%;
    padding: 5px 0;
    margin: 0;
  }
</style>
