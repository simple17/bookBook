import Config from './config.js';

let testAsync = () => {
  return dispatch => {
    setTimeout(()=>{
      dispatch({
        type: 'SET_LIST',
        books: books
      });
    }, 1000);
  };

};


var testSearch ={
	"length": 2,
	"data": [
		{
			"id": 0,
			"imageUrl":  "/images/image1.jpg",
			"title": "Приключения Пиноккио",
			"rating": 3,
			"tags": [
				{"id": 4, "name": "Название тэга1"},
				{"id": 5, "name": "Название тэга2"}
			]
		},{
			"id": 1,
			"imageUrl":  "/images/image2.jpg",
			"title": "Приключения Пиноккио в стране сказок",
			"rating": 5,
			"tags": [
				{"id": 6, "name": "Название тэга3"},
				{"id": 7, "name": "Название тэга4"}
			]
		}
	]

};

var loadBooks = (params) => {
    return dispatch => {
      fetch(`//${Config.api.path}${Config.api.methods.search}`, {
  method: 'post'})
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

      })


      // dispatch({
      //   type: 'SET_LIST',
      //   books: testSearch.data
      // });
    }
  };


export default {
  Search: loadBooks
};
