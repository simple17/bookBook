import React from 'react';
import classNames from 'classnames';

export default ({
    tags,
    select,
    disselect,
    formTags
  }) => {
  return (
      <div className="row">
        <div className="col-md-12">
          <p className="customLabel">Выберите тэги:</p>
          {
            tags.map(tag => {
              let selected = formTags.filter(t => tag.id === t.id).length ? true : false;
              let aClass = classNames('tagButton', 'btn', 'btn-default', selected ? 'tagButtonAdd' : '');
              let spanClass = classNames('glyphicon', 'glyphicon-ok', !selected ? 'tagNotAdded' : '');
              return (
                  <a className={aClass} onClick={() => { selected ? disselect(tag.id) : select(tag.id, tag.name) }}>{tag.name} <span className={spanClass} aria-hidden="true"></span></a>
                )
              })
          }

        </div>
      </div>
  )
};
