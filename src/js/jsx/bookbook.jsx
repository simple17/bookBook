import React from 'react';

export default ({
  books,
  loadMore
}) => {
  return (
    <div>
      <button onClick={loadMore}>Load books</button>
      <ul>
        {books.map(book => (
          <li>
            {book.name}
          </li>
          )
        )}
      </ul>
    </div>
  );
};
