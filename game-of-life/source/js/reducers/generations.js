const generations = (state = 1, action) => {
  switch (action.type) {
    case 'REPRODUCE':
      return state + 1;
    default:
      return state;
  }
};

export default generations;
