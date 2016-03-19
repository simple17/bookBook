export default (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_TAGS':
      return [...action.tags]
      break;
    case 'CLEAR_TAGS':
      return [];
    default:
      return state;
  }
};
