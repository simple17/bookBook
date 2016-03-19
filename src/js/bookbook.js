import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';


// import BookBookApp from './jsx/bookbook.jsx';
import mainReducer from './reducers/mainReducer.js';

const bookBookStore = createStore(mainReducer, applyMiddleware(thunk));
const history = syncHistoryWithStore(browserHistory, bookBookStore)

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

const TestComponent = ({children}) => {
  return (
    <div>{children}</div>
  );

};


// <BookBookApp
//   books={bookBookStore.getState().booksList}
//   loadMore={()=>{
//     bookBookStore.dispatch(testAsync());
//   }}/>
//
// <Provider store={bookBookStore}>
//   <div>
//     <Router history={history}>
//       <Route path="/" component={TestComponent}>
//         <IndexRoute component={TestComponent}/>
//         <Route path="book" component={TestComponent}/>
//         <Route path="modify-book" component={TestComponent}/>
//       </Route>
//     </Router>
//   </div>
// </Provider>

import App from './jsx/app.jsx';
import BooksList from './jsx/booksList.jsx';

const render = () => {
  ReactDOM.render(
    <Provider store={bookBookStore}>
      <div>
        <Router history={history}>
          <Route path="/client" component={App}>
            <Route path="list" component={BooksList}/>
          </Route>
        </Router>
      </div>
    </Provider>,
    document.getElementById('container')
  );
};

//bookBookStore.subscribe(render);
bookBookStore.dispatch({
  type: 'SET_LIST',
  books: books
});
render();
