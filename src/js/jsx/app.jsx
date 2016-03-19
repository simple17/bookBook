import React from 'react';
import TopMenu from './topmenu.jsx';

export default function App({ children }) {
  // console.log(store);
  return (
  <div>
    <div className="container-fluid">
        <TopMenu />
    </div>
    <div className="container" style={{ marginTop: '1.5em' }}>
        <h1 className="col-xs-12">МОЯ БИБЛИОТЕКА</h1>
        {children}
    </div>
  </div>
  )
};
