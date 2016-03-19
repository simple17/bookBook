import {combineReducers} from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import booksList from './booksListReducer';
import currentBook from './currentBookReducer.jsx';
import tags from './tagsReducer.js';

export default combineReducers(
  {
    booksList,
    currentBook,
    tags,
    routing: routerReducer
  }
);
