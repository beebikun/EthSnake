<template>
  <div id="pauseScreen"
       >
    <div>
      <h1> {{ header }} </h1>
      <p> Press SPACE to {{ sub }} </p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'PauseScreen',
  computed: {
    ...mapState({
      header: (state) => {
        switch(state.game.STATE) {
          case state.game.STATES.PAUSE:
            return 'PAUSE';
          case state.game.STATES.GAMEOVER:
            return 'You lose T_T';
          case state.game.STATES.WIN:
            return 'You win =^_^= !';
          default:
            return '';
        }
      },
      sub: (state) => {
        switch(state.game.STATE) {
          case state.game.STATES.PAUSE:
            return 'RESUME the game';
          case state.game.STATES.GAMEOVER:
          case state.game.STATES.WIN:
            return 'START again';
          default:
            return '';
        }
      },
    }),
  }
};

</script>

<style scoped>
  #pauseScreen {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.85);
    z-index: 1000;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  #pauseScreen h1 {
    font-size: 50px;
    margin-bottom: 20px;
    margin-top: 0;
  }
  #pauseScreen p {
    font-size: 25px;
  }
</style>
