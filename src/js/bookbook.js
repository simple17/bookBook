import React from 'react';
import ReactDOM from 'react-dom';

import {createStore} from 'redux';

import BookBookApp from './jsx/bookbook.jsx';
import mainReducer from './reducers/mainReducer.js';

const bookBookStore = createStore(mainReducer);

let books = [
  {
    name: 'test1',
    rating: 0,
    author: 'testAuthor',
    picture: null
  },
  {
    name: 'test1',
    rating: 2,
    author: 'testAuthor',
    picture: null
  },
  {
    name: 'test1',
    rating: 5,
    author: 'testAuthor',
    picture: null
  },
  {
    name: 'test1',
    rating: 3,
    author: 'testAuthor',
    picture: null
  },
  {
    name: 'test1',
    rating: 5,
    author: 'testAuthor',
    picture: null
  }
];


const render = () => {
  ReactDOM.render(
    <BookBookApp
      books={bookBookStore.getState().booksList}
      loadMore={()=>{
        bookBookStore.dispatch({
          type: 'SET_LIST',
          books: books
        });
      }}/>,
    document.getElementById('container')
  );
};

bookBookStore.subscribe(render);
render();
