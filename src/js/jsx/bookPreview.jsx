import React from 'react';
import Rating from './rating.jsx';
import Config from '../config.js';

export default ({
  title,
  readMore,
  rating,
  author,
  picture
}) => {
  return (
    <article className="col-xs-3">
      <img src={`//${Config.api.path}${picture}`} alt="book image"/>
      <h3>{title}</h3>
      <p>{author}</p>
      <Rating rating={rating}/>
      <a
        href='#'
        onClick={readMore}>Подробнее</a>
    </article>
  );
};
