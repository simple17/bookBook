import React from 'react';
import api from '../api.js';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import TopMenu from './topmenu.jsx';
//
// <div className="form-group">
//   <label htmlFor="addBookPhoto" className="col-sm-2 control-label">Фотография</label>
//   <div className="col-sm-10">
//     <input type="file" className="form-control" id="addBookPhoto" placeholder="Фотография"/>
//   </div>
// </div>

class AddBook extends React.Component {

  render(){
    const {store} = this.context;
    var title = '', rating = 0, author = '', description = '';
    return (
      <div>
        <div className="container-fluid">
            <TopMenu />
        </div>
        <div className="container">
          <h1>Новая книга</h1>
          <form
            className="form-horizontal"

            >
            <div className="form-group">
              <label htmlFor="addBookTitle" className="col-sm-2 control-label">Название</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="addBookTitle"
                  placeholder="Введите название книги"
                  ref={(input) => {
                    title = input;
                  }}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="addBookRating" className="col-sm-2 control-label">Рейтинг</label>
              <div className="col-sm-10">
                <input
                  type="number"
                  className="form-control"
                  id="addBookRating"
                  min={0}
                  max={5}
                  ref={(input) => {
                    rating = input;
                  }}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="addBookAuthor" className="col-sm-2 control-label">Автор</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="addBookAuthor"
                  placeholder="Введите имя автора"
                  ref={(input) => {
                    author = input;
                  }}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="addBookDescription" className="col-sm-2 control-label">Комментарий</label>
              <div className="col-sm-10">
                <textarea
                  className="form-control"
                  id="addBookDescription"
                  placeholder="Введите комментарий"
                  ref={(area) => {
                    description = area;
                  }}
                ></textarea>
              </div>
            </div>

            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <button
                  className="submit"
                  class="btn btn-default"
                  onClick={(e)=>{
                    e.preventDefault();
                    store.dispatch(api.AddBook(title.value, rating.value, author.value, description.value, browserHistory, store));
                  }}
                  >Сохранить</button>
              </div>
            </div>
          </form>
        </div>
      </div>

    );
  }
}

AddBook.contextTypes = {
  store: React.PropTypes.object
};

export default connect(
  state => ({  })
)(AddBook);
