var defaultState = {
  showParameters: false
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'TOGGLE_SHOW_PARAMETERS':
      return Object.assign({}, state, {
        showParameters: !state.showParameters
      });
      break;
    default:
      return state;
  }
};
