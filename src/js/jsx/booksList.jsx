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

export default connect(
  state => ({ books: state.booksList })
)(List);
