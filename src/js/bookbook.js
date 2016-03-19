import React from 'react';
import ReactDOM from 'react-dom';

const BookBookApp = () => {
  return (
    <div>Test</div>
  );
};

const render = () => {
  ReactDOM.render(
    <BookBookApp />,
    document.getElementById('container')
  );
};

render();
