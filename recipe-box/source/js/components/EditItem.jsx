'use strict';
import React from 'react';

const deleteButton = (
  <span className="input-group-btn">
    <button className="btn btn-danger" type="button">
      <i className="fa fa-trash" aria-hidden="true"></i>
    </button>
  </span>
);

class EditItem extends React.Component {
  render() {
    const { index, inputGroup, text, handleInput, deletable } = this.props;
    return (
      <div className="form-group">
        <div className="input-group">
          <span className="input-group-addon">{index}</span>
          <input
            type="text"
            name={inputGroup + '-' + index}
            className="form-control"
            value={text}
            onChange={handleInput}/>
          {deletable ? deleteButton : null}
        </div>
      </div>
    );
  }

}

export default EditItem;
