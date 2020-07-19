const setActiveTab = (activeTab) => {
  return {
    type: 'SET_ACTIVE_TAB',
    activeTab: activeTab,
  };
};

export default {
  setActiveTab,
};
