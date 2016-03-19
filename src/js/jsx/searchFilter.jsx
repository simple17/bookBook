import React from 'react';
import api from '../api.js';

class Filter extends React.Component {
  render(){
    const {store} = this.context;
    return (
    <div className="">
      <div className="row">
        <div className="col-md-11">
          <input type="text" className="customInput form-control" id="txtSearch" placeholder="Введите название книги" />
        </div>
        <span onClick={() => {
          store.dispatch(api.Search());
        }} className="col-md-1 glyphicon glyphicon-search"></span>
      </div>
      <div className="row">
        <p className="search-filter_extended col-md-2 col-md-offset-9">Расширенный поиск&nbsp;
          <span className="glyphicon glyphicon-triangle-right"/>
        </p>
      </div>
      <div className="row">
        <p className="search-filter_extended col-md-2 col-md-offset-9">Расширенный поиск&nbsp;
          <span className="glyphicon glyphicon-triangle-bottom"/>
        </p>
      </div>
      <div className="row">
        <div className="col-md-12">
          <p className="customLabel">Выбирите тэги:</p>
          <a className="tagButton tagButtonAdd btn btn-default">taaaaaaaaaag
            &nbsp;<span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
          </a>
          <a className="tagButton btn btn-default">taaAZAZAZAZAaaaaaaaaag
            &nbsp;<span className="tagNotAdded glyphicon glyphicon-ok " aria-hidden="true"></span>
          </a>
        </div>
      </div>
    </div>

    );
  }

}

Filter.contextTypes = {
  store: React.PropTypes.object
};

export default Filter;
