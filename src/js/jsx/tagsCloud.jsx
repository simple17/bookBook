import React from 'react';
import classNames from 'classnames';

export default ({tags, bookTags, select, disselect, addTag}) => {
  var inputRef;
  return (
      <div className="">
        <input className="customInput" ref={input => {
            inputRef = input;
          }}/>
        <button class="customButton" onClick={() => {
            addTag(inputRef.value);
            inputRef.value = '';
          }}><span className="glyphicon glyphicon-plus"></span></button>
        <div>
          {tags.map(tag => {
            let selected = bookTags.filter(t => tag.id === t.id).length ? true : false;
            let aClass = classNames('tagButton', 'btn', 'btn-default', 'btn-xs', selected ? 'tagButtonAdd' : '');
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
