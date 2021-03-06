import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import mainReducer from './reducers/mainReducer.js';

const bookBookStore = createStore(mainReducer, applyMiddleware(thunk));
const history = syncHistoryWithStore(browserHistory, bookBookStore)

import api from './api.js';
import App from './jsx/app.jsx';
import BooksList from './jsx/booksList.jsx';
import About from './jsx/about.jsx';
import Book from './jsx/book.jsx';
import AddBook from './jsx/addBook.jsx';
import Login from './jsx/login.jsx';

const render = () => {
  ReactDOM.render(
    <Provider store={bookBookStore}>
      <div>
        <Router history={history}>
          <Route path="/" component={App}>
            <IndexRoute component={Login}/>
            <Route path="list" component={BooksList}/>
            <Route path="book" component={Book}>
              <Route path="/book/:bookId" component={Book}/>
            </Route>
            <Route path="add" component={AddBook}/>
            <Route path="about" component={About}/>
          </Route>
        </Router>
      </div>
    </Provider>,
    document.getElementById('container')
  );
};
bookBookStore.dispatch(api.GetTagsCloud());
bookBookStore.dispatch(api.Search({name: "", tags: []}));

render();
