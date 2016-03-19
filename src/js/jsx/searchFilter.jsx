import React from 'react';

export default ({loadMore}) => {
  return (
  <div class="form-group">
    <div className="col-md-11">
      <input type="text" className="form-control" id="txtSearch" />
    </div>
    <span onClick={loadMore} className="col-md-1 glyphicon glyphicon-search"></span>
  </div>
  );
};
