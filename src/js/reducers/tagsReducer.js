export default (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_TAGS':
      return action.tags
      break;
    case 'CLEAR_TAGS':
      return [];
    case 'ADD_TAG':
      return [...state, {
        id: action.id,
        name: action.name
      }];
    default:
      return state;
  }
};
