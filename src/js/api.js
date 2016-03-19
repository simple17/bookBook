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
          authors: data[0][1],
          comments: data[0][3]
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
        method: 'put',
        body: JSON.stringify({
          name: tag
        })
      }
    )
    .then(function(response) {
      return response.json()
    }).then(function(data) {
      console.log(data);
    });

    // dispatch({
    //   type: 'ADD_TAG_TO_BOOK',
    //   tag: tag,
    //   bookId: bookId
    // });
  };
};

export default {
  Search: loadBooks,
  GetBook: loadBook,
  GetTagsCloud: loadTagsCloud,
  CreateTag: createTag
};
