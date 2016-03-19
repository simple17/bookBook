import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware } from 'redux';

import BookBookApp from './jsx/bookbook.jsx';
import mainReducer from './reducers/mainReducer.js';

const bookBookStore = createStore(mainReducer, applyMiddleware(thunk));

let books = [
  {
    id: 0,
    name: 'test1',
    rating: 0,
    author: 'testAuthor',
    picture: null
  },
  {
    id: 1,
    name: 'test1',
    rating: 2,
    author: 'testAuthor',
    picture: null
  },
  {
    id: 2,
    name: 'test1',
    rating: 5,
    author: 'testAuthor',
    picture: null
  },
  {
    id: 3,
    name: 'test1',
    rating: 3,
    author: 'testAuthor',
    picture: null
  },
  {
    id: 4,
    name: 'test1',
    rating: 5,
    author: 'testAuthor',
    picture: null
  }
];

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

const render = () => {
  ReactDOM.render(
    <BookBookApp
      books={bookBookStore.getState().booksList}
      loadMore={()=>{
        bookBookStore.dispatch(testAsync());
      }}/>,
    document.getElementById('container')
  );
};

bookBookStore.subscribe(render);
render();
