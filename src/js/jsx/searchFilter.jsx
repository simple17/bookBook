import React from 'react';

export default ({loadMore}) => {
  return (
    <div class="form-group">
      <input type="text" className="form-control" id="txtSearch"/>
      <span class="glyphicon glyphicon-name"></span>
      <button onClick={loadMore}>Load books</button>
    </div>
  );
};
