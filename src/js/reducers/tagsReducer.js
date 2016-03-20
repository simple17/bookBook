export default (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_TAGS':
      return action.tags
      break;
    case 'CLEAR_TAGS':
      return [];
    case 'ADD_TAG':
      let tagExist = state.filter(t => t.id === action.id).length ? true : false;
      if(tagExist){
        return state;
      } else{
        return [...state, {
          id: action.id,
          name: action.name
        }];  
      }

    default:
      return state;
  }
};
