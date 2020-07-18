const setMultiplier = (num) => {
  return {
    type: 'SET_MULTIPLIER',
    multiplier: num,
  };
};

export default {
  setMultiplier,
};
