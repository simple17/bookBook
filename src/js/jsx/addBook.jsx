import React from 'react';
import api from '../api.js';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
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
    var title = '', rating = 0;
    return (
      <div className=''>
        <h2>Новая книга</h2>
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
            <div className="col-sm-offset-2 col-sm-10">
              <button
                className="submit"
                class="btn btn-default"
                onClick={(e)=>{
                  e.preventDefault();
                  store.dispatch(api.AddBook(title.value, rating.value, browserHistory));
                }}
                >Сохранить</button>
            </div>
          </div>
        </form>
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
