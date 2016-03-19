import React from 'react';
import Book from './bookPreview.jsx';

export default ({
  books,
  loadMore
}) => {
  return (
    <div className='container'>
      <button onClick={loadMore}>Load books</button>
      <div className='row'>
        {books.map(book => (
          <Book
            name={book.name}
            author={book.author}
            rating={book.rating}
            readMore={(e)=>{
              e.preventDefault();
            }}
          />
          )
        )}
      </div>
    </div>
  );
};
