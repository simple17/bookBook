import {combineReducers} from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import booksList from './booksListReducer';

export default combineReducers(
  {booksList, routing: routerReducer}
);
