import React from 'react';
import Book from './bookPreview.jsx';
import TopMenu from './topMenu.jsx';

export default ({
  books,
  loadMore
}) => {
  return (
    <div className='container'>
      <TopMenu />
      <h1>Моя библиотека</h1>
      <button onClick={loadMore}>Load books</button>
      <div className='row'>
        {books.map(book => (
          <Book
            key={book.id}
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
