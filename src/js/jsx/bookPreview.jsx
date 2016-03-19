import React from 'react';
import Rating from './rating.jsx';

export default ({
  name,
  readMore,
  rating,
  author,
  picture
}) => {
  return (
    <article className="col-xs-3">
      <h3>{name}</h3>
      <p>{author}</p>
      <Rating rating={rating}/>
      <a
        href='#'
        onClick={readMore}>Подробнее</a>
    </article>
  );
};
