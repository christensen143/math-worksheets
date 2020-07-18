const questions = (
  state = {
    multiplier: null,
  },
  action
) => {
  switch (action.type) {
    case 'SET_MULTIPLIER':
      return {
        ...state,
        multiplier: action.multiplier,
      };
    default:
      return state;
  }
};

export default questions;
