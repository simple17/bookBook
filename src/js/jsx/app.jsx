import React from 'react';
import TopMenu from './topmenu.jsx';

export default function App({ children }) {
  // console.log(store);
  return (
  <div>
    <div className="container-fluid">
        <TopMenu />
    </div>
    <div className="container">
        <h1>МОЯ БИБЛИОТЕКА</h1>
        {children}
    </div>
  </div>
  )
};
