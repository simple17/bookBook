import React from 'react';
import { connect } from 'react-redux'
import Book from './bookPreview.jsx';
import SearchFilter from './searchFilter.jsx';
import TopMenu from './topmenu.jsx';
const List = ({
  books,
  loadMore
}) => {
  return (
    <div>
      <div className="container-fluid">
          <TopMenu />
      </div>
      <div className="container">
        <h1>МОЯ БИБЛИОТЕКА</h1>
        <SearchFilter loadMore={loadMore}/>
        <div className='row top-buffer'>
          {books.map(book => (
            <Book
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
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
    </div>
  );
};

export default connect(
  state => ({ books: state.booksList })
)(List);
