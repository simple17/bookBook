import Config from './config.js';
import fetch from './fetch';

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

var api = () => {
  var that = this;

  that.loadBooks = (params) => {
    return dispatch => {
      
    }
  }
}
