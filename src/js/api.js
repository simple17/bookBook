import Config from './config.js';

var loadBooks = (params) => {
  return dispatch => {
    fetch(`//${Config.api.path}${Config.api.methods.search}`, { method: 'post'})
    .then(function(response) {
      return response.json()
    }).then(function(data) {
      if(data.length){
        dispatch({
          type: 'SET_LIST',
          books: data.data
        });
      } else{
        dispatch({
          type: 'SET_LIST',
          books: []
        });
      }
    });
  };
};

var loadBook = (id) => {
  return dispatch => {
    fetch(`//${Config.api.path}${Config.api.methods.book}/${id}`, { method: 'get'})
    .then(function(response) {
      return response.json()
    }).then(function(data) {
      if(!Object.is(data, {})){
        dispatch({
          type: 'SET_CURRENT_BOOK',
          id: data.id,
          imageUrl:  data.imageUrl,
          title: data.title,
          rating: data.rating,
          tags: data.tags,
          authors: data.authors,
          comments: data.comments
        });
      }
    });
  };
};

var loadTagsCloud = () => {
  return dispatch => {
    fetch(`//${Config.api.path}${Config.api.methods.tagsCloud}`, { method: 'get'})
    .then(function(response) {
      return response.json()
    }).then(function(data) {
      if(data.length){
        dispatch({
          type: 'UPDATE_TAGS',
          tags: data
        });
      }
    });

  };
};

var addTagToBook = (bookId, tag) => {
  return dispatch => {
    // fetch(`//${Config.api.path}${Config.api.methods.tagsCloud}`, { method: 'post'})
    // .then(function(response) {
    //   return response.json()
    // }).then(function(data) {
    //   if(data.length){
    //     dispatch({
    //       type: 'ADD_TAG_TO_BOOK',
    //       tag: tag,
    //       bookId: bookId
    //     });
    //   }
    // });

    dispatch({
      type: 'ADD_TAG_TO_BOOK',
      tag: tag,
      bookId: bookId
    });
  };
};

export default {
  Search: loadBooks,
  GetBook: loadBook,
  GetTagsCloud: loadTagsCloud,
  AddTagToBook: addTagToBook
};
