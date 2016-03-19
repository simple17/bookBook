import React from 'react';
import Book from './bookPreview.jsx';
import TopMenu from './topMenu.jsx';
import SearchFilter from './searchFilter.jsx';

export default ({
  books,
  loadMore
}) => {
  return (
    <div className='container'>
      <TopMenu />
      <h1>Моя библиотека</h1>
      <SearchFilter loadMore={loadMore}/>
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
