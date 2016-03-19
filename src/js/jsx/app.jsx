import React from 'react';
import { Link, browserHistory } from 'react-router';

export default function App({ children }) {
  return (
    <div>
      <header>
        Links:
        {' '}
        <Link to="/">Home</Link>
        {' '}
        <Link to="/book">Book</Link>
        {' '}
        <Link to="/modify-book">Modify</Link>
      </header>
      <div>
        <button onClick={() => browserHistory.push('/book')}>Go to /foo</button>
      </div>
      <div style={{ marginTop: '1.5em' }}>{children}</div>
    </div>
  )
};
