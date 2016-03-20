import React from 'react';
import classNames from 'classnames';

export default ({tags, bookTags, select, disselect, addTag}) => {
  var inputRef;
  return (
      <div className="">
        <input ref={input => {
            inputRef = input;
          }}/>
        <button onClick={() => {
            addTag(inputRef.value);
            inputRef.value = '';
          }}>+</button>
        <div>
          {tags.map(tag => {
            let selected = bookTags.filter(t => tag.id === t.id).length ? true : false;
            let aClass = classNames('tagButton', 'btn', 'btn-default', selected ? 'tagButtonAdd' : '');
            let spanClass = classNames('glyphicon', 'glyphicon-ok', !selected ? 'tagNotAdded' : '');
            return (
                <a className={aClass} onClick={() => { selected ? disselect(tag.id) : select(tag.id) }}>{tag.name} <span className={spanClass} aria-hidden="true"></span></a>
              )
            }
          )}
        </div>

      </div>
  )
};
