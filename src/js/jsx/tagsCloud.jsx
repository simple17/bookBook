import React from 'react';
import classNames from 'classnames';

export default ({tags, bookTags, select, disselect}) => {
  return (
      <div className="">
        {tags.map(tag => {
          let selected = bookTags.filter(t => tag.id === t.id).length ? true : false;
          let aClass = classNames('tagButton', 'btn', 'btn-default', selected ? 'tagButtonAdd' : '');
          let spanClass = classNames('glyphicon', 'glyphicon-ok', !selected ? 'tagNotAdded' : '');
          return (
              <a className={aClass}>{tag.name} <span class={spanClass} aria-hidden="true"></span></a>
            )
          }
        )}
      </div>
  )
};
