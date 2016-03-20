import Config from './config.js';

var loadBooks = (params) => {
  return dispatch => {
    fetch(`//${Config.api.path}${Config.api.methods.search}`, { method: 'post',
            body: JSON.stringify(params)
    })
    .then(function(response) {
      return response.json()
    }).then(function(data) {
      if(data.data.length){
        dispatch({
          type: 'SET_LIST',
          books: data.data.map(b => {
            return {
              id: b[0].metadata.id,
              title: b[0].data.title,
              rating: b[0].data.rating,
              imageUrl: b[0].data.imageUrl ? b[0].data.imageUrl : ''
            };
          })
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
          id: data[0][0].metadata.id,
          imageUrl:  data[0][0].data.imageUrl ? data[0][0].data.imageUrl : '',
          title: data[0][0].data.title,
          rating: data[0][0].data.rating,
          author: data[0][0].data.author,
          tags: data[0][2].map(t => {
            return {
              id: t.metadata.id,
              name: t.data.name
            };
          }),
          authors: [],
          comments: []
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
          tags: data.map(t => {
            return {
              id: t.metadata.id,
              name: t.data.name
            }
          })
        });
      }
    });

  };
};

var createTag = (bookId, tag) => {
  return dispatch => {
    fetch(`//${Config.api.path}${Config.api.methods.createTag}/${bookId}/tag`,
      {
        method: 'post',
        body: JSON.stringify({
          name: tag
        })
      }
    )
    .then(function(response) {
      return response.json()
    }).then(function(data) {
      dispatch({
        type: 'ADD_TAG',
        name: data.data[0][0].data.name,
        id: data.data[0][0].metadata.id
      });
      dispatch({
        type: 'ADD_TAG_TO_CURRENT_BOOK',
        name: data.data[0][0].data.name,
        id: data.data[0][0].metadata.id
      });
    });


  };
};

var addTagToBook = (bookId, tagId) => {
  return dispatch => {
    fetch(`//${Config.api.path}${Config.api.methods.createTag}/${bookId}/tag`,
      {
        method: 'post',
        body: JSON.stringify({
          id: tagId
        })
      }
    )
    .then(function(response) {
      return response.json()
    }).then(function(data) {
      var tag = data.data[0][0];
      console.log(data);
      dispatch({
        type: 'ADD_TAG',
        name: tag.data.name,
        id: tag.metadata.id
      });
      dispatch({
        type: 'ADD_TAG_TO_CURRENT_BOOK',
        name: tag.data.name,
        id: tag.metadata.id
      });
    });
  };
};

var removeTagFromBook = (bookId, tagId) => {
  return dispatch => {
    fetch(`//${Config.api.path}/rest/book/${bookId}/tag/${tagId}`,
      {
        method: 'post'
      }
    )
    .then(function(response) {
      return response.json()
    }).then(function(data) {
      // var tag = data.data[0][0];
      dispatch({
        type: 'REMOVE_TAG_FROM_CURRENT_BOOK',
        id: tagId
      });
    });
  };
};
var addBook = (title, rating, author, history, store) => {
  return dispatch => {
    fetch(`//${Config.api.path}/rest/book`,
      {
        method: 'post',
        body: JSON.stringify({
          title: title,
          rating: rating ? +rating : 0,
          author: author
        })
      }
    )
    .then(function(response) {
      return response.json()
    }).then(function(data) {
      console.log(data);
      store.dispatch(loadBook(data.id));
      store.dispatch(loadTagsCloud());
      history.push(`/book/${data.id}`);
    });
  };
};
var updateRatingForBook = (bookId, rating) => {
  return dispatch => {
    fetch(`//${Config.api.path}/rest/book/${bookId}/rating/${rating}`,
      {
        method: 'post'
      }
    )
    .then(function(response) {
      return response.json()
    }).then(function(data) {
      // var tag = data.data[0][0];
      dispatch({
        type: 'UPDATE_RATING_FOR_CURRENT_BOOK',
        rating: rating
      });

      dispatch({
        type: 'UPDATE_BOOK_RATING',
        id: bookId,
        rating: rating
      });
    });
  };
};

var updatePhoto = (body, bookId) => {
  return dispatch => {
    fetch(`//${Config.api.path}/rest/book/${bookId}/upload`,
      {
        method: 'post',
        body: body
      }
    )
    .then(function(response) {
      return response.json()
    }).then(function(data) {
      dispatch({
        type: 'UPDATE_PICTURE_FOR_BOOK',
        imageUrl: "/images/9048a533-6087-4678-b737-eed4e2ef7ac0"
      });
    });
  };
};

export default {
  Search: loadBooks,
  GetBook: loadBook,
  GetTagsCloud: loadTagsCloud,
  CreateTag: createTag,
  AddTagToBook: addTagToBook,
  RemoveTagFromBook: removeTagFromBook,
  AddBook: addBook,
  UpdateRatingForBook: updateRatingForBook,
  UpdatePhoto: updatePhoto
};
