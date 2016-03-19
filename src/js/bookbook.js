import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import mainReducer from './reducers/mainReducer.js';

const bookBookStore = createStore(mainReducer, applyMiddleware(thunk));
const history = syncHistoryWithStore(browserHistory, bookBookStore)


import App from './jsx/app.jsx';
import BooksList from './jsx/booksList.jsx';
import About from './jsx/about.jsx';

const render = () => {
  ReactDOM.render(
    <Provider store={bookBookStore}>
      <div>
        <Router history={history}>
          <Route path="/" component={App}>
            <IndexRoute component={BooksList}/>
            <Route path="list" component={BooksList}/>
            <Route path="About" component={About}/>
          </Route>
        </Router>
      </div>
    </Provider>,
    document.getElementById('container')
  );
};

//bookBookStore.subscribe(render);
// bookBookStore.dispatch({
//   type: 'SET_LIST',
//   books: books
// });
render();
