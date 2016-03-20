export default (state = [], action) => {
  switch (action.type) {
    case 'SET_LIST':
      return [
        ...action.books
      ];
      break;
     case 'UPDATE_BOOK_RATING':
        return state.map(b => {
          if(b.id === action.id){
            return Object.assign({}, b, {
              rating: action.rating
            });
          }
          return b;
        });
        break;
    default:
      return state;
  }
};
