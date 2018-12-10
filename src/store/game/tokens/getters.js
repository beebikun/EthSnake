export default {
  findToken(state) {
    return (idx) => {
      return state[idx];
    };
  },
};
