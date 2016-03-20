import React from 'react';
import api from '../api.js';
import classNames from 'classnames';
import { connect } from 'react-redux';
import FilterByTags from './filterByTags.jsx';


class Filter extends React.Component {
  render(){
    const {store} = this.context;
    const searchState = store.getState().search;
    const tags = store.getState().tags;
    return (
    <div className="">
      <div className="row">
        <div className="col-md-11">
        <form onSubmit={(e) => {
            e.preventDefault();
             let text = this.input.value;
             store.dispatch(api.Search({
               name: text,
               tags: searchState.selectedTags.map(t => {
                 return {id: t.id};
               })
             }));
            }}>
          <input
            type="text"
            className="customInput form-control"
            id="txtSearch"
            placeholder="Введите название книги"
            ref={input => {
              this.input = input;
            }}
            />
        </form>
        </div>
        <span
            onClick={() => {
              let text = this.input.value;
              store.dispatch(api.Search({
                name: text,
                tags: searchState.selectedTags.map(t => {
                  return {id: t.id};
                })
              }));
            }}
            className="col-md-1 glyphicon glyphicon-search"></span>
      </div>
      <div className="row">
        <p
          className="search-filter_extended col-md-2 col-md-offset-9"
          onClick={()=>{
            store.dispatch({
              type: 'TOGGLE_SHOW_PARAMETERS'
            });
          }}
          >Расширенный поиск&nbsp;
          <span className={classNames('glyphicon', searchState.showParameters ? 'glyphicon-triangle-bottom' : 'glyphicon-triangle-right')}/>
        </p>
      </div>
      <div className="" style={{display: searchState.showParameters ? 'block' : 'none'}}>
         <FilterByTags
           tags={tags}
           select={(id, name)=>{
             store.dispatch({
               type: 'SELECT_SEARCH_TAG',
               id: id,
               name: name
             });
           }}
           disselect={(id)=>{
             store.dispatch({
               type: 'DISSELECT_SEARCH_TAG',
               id: id
             });
           }}
           formTags={searchState.selectedTags}
           />
      </div>
    </div>

    );
  }

}

Filter.contextTypes = {
  store: React.PropTypes.object
};
export default connect(
  state => ({ search: state.search, tags: state.tags })
)(Filter);
