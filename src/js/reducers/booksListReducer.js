export default (state = [], action) => {
  switch (action.type) {
    case 'SET_LIST':
      return [
        ...state,
        ...action.books
      ];
      break;
    default:
      return state;
  }
};
