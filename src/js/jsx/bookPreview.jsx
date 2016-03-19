import React from 'react';
import Rating from './rating.jsx';
import Config from '../config.js';
import { browserHistory } from 'react-router'

export default ({
  title,
  readMore,
  rating,
  author,
  picture,
  id
}) => {
  return (
    <article className="col-xs-3">
      <img src={`//${Config.api.path}${picture}`} alt="book image"/>
      <h4 className="book-preview_title">{title}</h4>
      <p>{author}</p>
      <Rating rating={rating}/>
      <button onClick={() => browserHistory.push(`/book/${id}`)}>Подробнее</button>
    </article>
  );
};
