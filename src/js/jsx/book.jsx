import React from 'react';
import api from '../api.js';
import Rating from './rating.jsx';
import Config from '../config.js';
import { connect } from 'react-redux';
import TagsCloud from './tagsCloud.jsx';

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
            <TagsCloud
              tags={tags}
              bookTags={book.tags}
              select={(tagId) => {
                store.dispatch(api.AddTagToBook(book.id, tagId));  
              }}
              disselect={(e) => {
                console.log("in disselect " + e );
                e.preventDefault();
              }}
              addTag={(value) => {
                console.log(value + "  " + book.id);
                store.dispatch(api.CreateTag(book.id, value));
              }}
              />
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
