import React from 'react';
import api from '../api.js';
import Rating from './rating.jsx';

class Book extends React.Component {
  render(){
    const {store} = this.context;
    return (
      <div className=''>
        <article className='row'>
          <div className="col-xs-3">
            <img className="img-responsive" src=""/>
            <Rating rating={4}/>
            <button>Редактировать</button>
          </div>
          <div className="col-xs-9">
            <h2>НАЗВАНИЕ КНИГИ</h2>
            <p>Авторы: Стругатские</p>
            <p>Год: 1984</p>
            <p>Комментарий: Какой-то коммент</p>
          </div>
        </article>
      </div>
    );
  }
}

Book.contextTypes = {
  store: React.PropTypes.object
};

export default Book;

// export default connect(
//   state => ({ books: state.currentBook })
// )(Book);
