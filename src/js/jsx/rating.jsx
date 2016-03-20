import React from 'react';
import classNames from 'classnames';

export default ({rating, setRating}) => {
  let maxStars = 5, list = [];
  for(let i = 0; i < maxStars; i++){
    list.push((
      <span className={classNames(['glyphicon', i < rating ? 'glyphicon-star' : 'glyphicon-star-empty'])}
        aria-hidden="true" key={i} onClick={() => { setRating(i+1) }}></span>));
  };
  return(
    <div>{list}</div>
  );
}
