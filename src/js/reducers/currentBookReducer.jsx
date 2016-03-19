
const defaultState = {
  "id": null,
  "imageUrl":  "",
  "title": "",
  "rating": 0,
  "tags": [],
  "authors": [],
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
      	"authors": action.authors,
      	"comments": action.comments
      };
      break;
    case 'CLEAR_CURRENT_BOOK':
      return Object.assign({}, defaultState);
    default:
      return state;
  }
};
