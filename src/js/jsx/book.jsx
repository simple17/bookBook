import React from 'react';
import api from '../api.js';
import Rating from './rating.jsx';
import Config from '../config.js';
import { connect } from 'react-redux'

class Book extends React.Component {

  render(){
    const {store} = this.context;
    const book = store.getState().currentBook;
    const tags = store.getState().tags;
    return (
      <div className=''>
        <article className='row'>
          <div className="col-xs-3">
            <img className="img-responsive" src={`//${Config.api.path}${book.imageUrl}`}/>
            <Rating rating={book.rating}/>
            <button>Редактировать</button>
          </div>
          <div className="col-xs-6">
            <h2>{book.title}</h2>
            <p>Авторы: {book.authors.map(a => a.fio).join(', ')}</p>
            {book.comments.length ? (<h3>Комментарий: </h3>) : ''}
            {
              book.comments.map(c => (
                <p key={c.id}>"{c.text}"</p>
              ))
            }
          </div>
          <div className="col-xs-3">
            <h4>Добавить тэги:</h4>
            <ul>
              {
                tags.map(t => (
                  <li
                    key={t.id}
                    onClick={()=>{
                      //store.dispatch(api.AddTagToBook(book.id, t));
                    }}>
                    {t.name}
                  </li>
                ))
              }
            </ul>
          </div>
        </article>
      </div>
    );
  }
}

Book.contextTypes = {
  store: React.PropTypes.object
};

export default connect(
  state => ({ book: state.currentBook, tags: state.tags })
)(Book);
