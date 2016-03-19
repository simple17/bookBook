import React from 'react';
import { Link, browserHistory } from 'react-router';

export default ({}) => {
  return (
    <div className="col-xs-12">Меню:
      {' '}
      <Link to="/list">Список книг</Link>
      {' '}
      <Link to="/about">О нас</Link>
    </div>
  );
};
