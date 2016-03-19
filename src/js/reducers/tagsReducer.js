export default (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_TAGS':
      return action.tags.map(t => {
        return {
          id: t.id,
          name: t.data.name
        }
      })
      break;
    case 'CLEAR_TAGS':
      return [];
    default:
      return state;
  }
};
