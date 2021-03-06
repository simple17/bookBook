import React from 'react';
import { Link, browserHistory } from 'react-router';

export default ({}) => {
  return (
  <header className="row">
    <div className="col-xs-12">
      <nav className="customNavBar navbar navbar-default">
        <div className="navbar-header">
          <Link to="/list">
            {<img src="/img/logo.png" alt="Logo" id="topLogo"/>}
          </Link>
        </div>
        <ul className="nav navbar-nav navbar-right">
          <li>
            <Link to="/add">
                {<span className="glyphicon glyphicon-plus"></span>}
            </Link>
          </li>
          <li id="liMyLibrary">
            <Link to="/list">
               МОЯ БИБЛИОТЕКА
            </Link>
          </li>
          <li>
            <Link to="/login">
               {<span className="glyphicon glyphicon-user"></span>}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
   </header>
  );
};
