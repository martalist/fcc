const generations = (state = 1, action) => {
  switch (action.type) {
    case 'REPRODUCE':
      return state + 1;
    case 'NEW_GAME':
    case 'CLEAR_BOARD':
      return 1;
    default:
      return state;
  }
};

export default generations;
