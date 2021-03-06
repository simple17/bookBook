
const defaultState = {
  "id": null,
  "imageUrl":  "",
  "title": "",
  "rating": 0,
  "tags": [],
  "author": "",
  "comments": []
};
export default (state = Object.assign({}, defaultState), action) => {
  switch (action.type) {
    case 'SET_CURRENT_BOOK':

      return {
        "id": action.id,
      	"imageUrl":  action.imageUrl,
      	"title": action.title,
      	"rating": action.rating,
      	"tags": action.tags,
      	"author": action.author,
      	"comments": action.comments,
        description: action.description
      };
      break;
    case 'CLEAR_CURRENT_BOOK':
      return Object.assign({}, defaultState);
    case 'ADD_TAG_TO_CURRENT_BOOK':
      return Object.assign({}, state, {
        tags: [...state.tags, {id: action.id, name: action.name}]
      });
    case 'REMOVE_TAG_FROM_CURRENT_BOOK':
      return Object.assign({}, state, {
        tags: state.tags.filter(t => t.id !== action.id)
      });
    case 'UPDATE_RATING_FOR_CURRENT_BOOK':
      return Object.assign({}, state, {
       rating: action.rating
      });
    case 'UPDATE_PICTURE_FOR_BOOK':
      return Object.assign({}, state, {
       imageUrl: action.imageUrl
      });
    default:
      return state;
  }
};
