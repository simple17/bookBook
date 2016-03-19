import React from 'react';
import api from '../api.js';

class Filter extends React.Component {
  render(){
    const {store} = this.context;
    return (
    <div className="">
      <div className="row">
        <div className="col-md-11">
          <input type="text" className="form-control" id="txtSearch" />
        </div>
        <span onClick={() => {
          store.dispatch(api.Search());
        }} className="col-md-1 glyphicon glyphicon-search"></span>
      </div>
      <div class="row">
        <span>Расширенный поиск</span>
      </div>
    </div>

    );
  }

}

Filter.contextTypes = {
  store: React.PropTypes.object
};

export default Filter;
