<template>
  <div>
    <SnakeBlock class="SnakeBlocks"
      v-for="block in blocks"
      v-bind="block"
      :key="block.id"
      />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import SnakeBlock from './SnakeBlock.vue';

export default {
  name: 'Snake',
  components: { SnakeBlock },
  computed: {
    ...mapState({
      blocks: (state) => state.game.snake.blocks,
    }),
  },
};

</script>

<style scoped>
</style>
