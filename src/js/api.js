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
              title: b[0].data.title

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
          imageUrl:  '',
          title: data[0][0].data.title,
          rating: 0,
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
        type: 'REMOVE_TAG_FROM_CURRENT_BOOK',
        id: tagId
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
  UpdateRatingForBook: updateRatingForBook
};
