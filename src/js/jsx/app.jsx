import React from 'react';
import TopMenu from './topmenu.jsx';

export default function App({ children }) {
  // console.log(store);
  return (
    <div className="container">
      <header className="row">
        <h1 className="col-xs-12">Моя библиотека</h1>
        <TopMenu />
      </header>
      <div style={{ marginTop: '1.5em' }}>{children}</div>
    </div>
  )
};
