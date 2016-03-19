export default (state = [], action) => {
  switch (action.type) {
    case 'SET_LIST':
      return [
        ...action.books
      ];
      break;
    default:
      return state;
  }
};
