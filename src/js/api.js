import Config from './config.js';

var loadBooks = (params) => {
  return dispatch => {
    fetch(`//${Config.api.path}${Config.api.methods.search}`, { method: 'post',
            body: JSON.stringify({
              "name": "111",
              "tags": [
                {"id": 1},
                {"id": 2}
              ]
            })
    })
    .then(function(response) {
      return response.json()
    }).then(function(data) {
      if(data.data.length){
        dispatch({
          type: 'SET_LIST',
          books: data.data[0].map(b => {
            return {
              id: b.metadata.id,
              title: b.data.title

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

export default {
  Search: loadBooks,
  GetBook: loadBook,
  GetTagsCloud: loadTagsCloud,
  CreateTag: createTag,
  AddTagToBook: addTagToBook
};
