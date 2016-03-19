import React from 'react';
import api from '../api.js';
import Rating from './rating.jsx';
import { connect } from 'react-redux'

class Book extends React.Component {

  render(){
    const {store} = this.context;
    const book = store.getState().currentBook;
    return (
      <div className=''>
        <article className='row'>
          <div className="col-xs-3">
            <img className="img-responsive" src={book.imageUrl}/>
            <Rating rating={book.rating}/>
            <button>Редактировать</button>
          </div>
          <div className="col-xs-9">
            <h2>{book.title}</h2>
            <p>Авторы: {book.authors.map(a => a.name).join(', ')}</p>
            <h3>Комментарий: </h3>
            {
              book.comments.map(c => (
                <p key={c.id}>"{c.text}"</p>
              ))
            }
          </div>
        </article>
      </div>
    );
  }
}

Book.contextTypes = {
  store: React.PropTypes.object
};

// export default Book;

export default connect(
  state => ({ book: state.currentBook })
)(Book);
