import React from 'react';
import { connect } from 'react-redux'
import Book from './bookPreview.jsx';
import SearchFilter from './searchFilter.jsx';

const List = ({
  books,
  loadMore
}) => {
  return (
    <div className=''>
      <SearchFilter loadMore={loadMore}/>
      <div className='row'>
        {books.map(book => (
          <Book
            key={book.id}
            id={book.id}
            title={book.title}
            authors={book.authors}
            rating={book.rating}
            picture={book.imageUrl}
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

export default connect(
  state => ({ books: state.booksList })
)(List);
