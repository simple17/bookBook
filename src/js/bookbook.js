import React from 'react';
import ReactDOM from 'react-dom';

import {createStore} from 'redux';

import BookBookApp from './jsx/bookbook.jsx';
import mainReducer from './reducers/mainReducer.js';

const bookBookStore = createStore(mainReducer);

let books = [
  {name: 'test1'},
  {name: 'test2'},
  {name: 'test3'},
  {name: 'test4'},
  {name: 'test5'},
  {name: 'test6'},
  {name: 'test7'}
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
