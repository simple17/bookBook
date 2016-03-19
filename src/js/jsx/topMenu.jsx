import React from 'react';
import { Link, browserHistory } from 'react-router';

export default ({}) => {
  return (
  <header className="row">
    <div className="col-xs-12">
      <nav className="navbar navbar-default">
        {' '}
        <Link to="/list">Список книг</Link>
        {' '}
        <Link to="/about">О нас</Link>
      </nav>
    </div>
   </header>
  );
};
