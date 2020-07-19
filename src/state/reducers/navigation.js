const navigation = (
  state = {
    activeTab: 'home',
  },
  action
) => {
  switch (action.type) {
    case 'SET_ACTIVE_TAB':
      return {
        ...state,
        activeTab: action.activeTab,
      };
    default:
      return state;
  }
};

export default navigation;
