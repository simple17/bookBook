import {combineReducers} from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import booksList from './booksListReducer';
import currentBook from './currentBookReducer.jsx';

export default combineReducers(
  {booksList, currentBook, routing: routerReducer}
);
