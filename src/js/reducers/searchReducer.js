var defaultState = {
  showParameters: false,
  selectedTags: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'TOGGLE_SHOW_PARAMETERS':
      return Object.assign({}, state, {
        showParameters: !state.showParameters
      });
      break;
    case 'SELECT_SEARCH_TAG':
      return Object.assign({}, state, {
        selectedTags: [...state.selectedTags, {
          id: action.id,
          name: action.name
        }]
      });
    case 'DISSELECT_SEARCH_TAG':
      return Object.assign({}, state, {
        selectedTags: state.selectedTags.filter(t => t.id !== action.id)
      });
    default:
      return state;
  }
};
