import React from 'react';
import Rating from './rating.jsx';
import Config from '../config.js';
import api from '../api.js';
import { browserHistory } from 'react-router';


class Preview extends React.Component {
  render(){
    const {store} = this.context;
    return (
      <article className="col-xs-3 text-center">
        <div className="customBorderForPreview thumbnail">
          <img src={`//${Config.api.path}${this.props.picture}`} className="img-responsive" alt="book image"/>
          <h4 className="book-preview_title">{this.props.title}</h4>
          <p>{this.props.authors.map(a => a.fio).join(', ')}</p>
          <Rating rating={this.props.rating}/>
          <button className="customButton" onClick={() => {
              store.dispatch(api.GetBook(this.props.id));
              store.dispatch(api.GetTagsCloud());
              browserHistory.push(`/book/${this.props.id}`);
            }}>Подробнее</button>
        </div>
      </article>
    );
  }
};

Preview.contextTypes = {
  store: React.PropTypes.object
};

export default Preview;

// export default ({
//   title,
//   readMore,
//   rating,
//   authors,
//   picture,
//   id
// }) => {
//   return (
//     <article className="col-xs-3">
//       <img src={`//${Config.api.path}${picture}`} alt="book image"/>
//       <h3>{title}</h3>
//       <p>{authors.map(a => a.name).join(', ')}</p>
//       <Rating rating={rating}/>
//       <button onClick={() => }>Подробнее</button>
//     </article>
//   );
// };
