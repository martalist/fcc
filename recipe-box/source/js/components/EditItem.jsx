'use strict';
import React from 'react';


class EditItem extends React.Component {
  render() {
    const { index, inputGroup, text, handleInput, handleDeleteItem, deletable } = this.props;
    const deleteButton = (
      <span className="input-group-btn" >
        <button
          className="btn btn-danger"
          type="button"
          onClick={handleDeleteItem}
          name={inputGroup + '-' + index} >
            <i className="fa fa-trash" aria-hidden="true"></i>
        </button>
      </span>
    );
    return (
      <div className="form-group">
        <div className="input-group">
          <span className="input-group-addon">{index}</span>
          <input
            type="text"
            name={inputGroup + '-' + index}
            className="form-control"
            placeholder={"Enter a" + (
              inputGroup === 'ingredients' ?
              "n " + inputGroup.slice(0, -1) :
              " " + inputGroup
            )}
            value={text}
            onChange={handleInput}/>
          {deletable ? deleteButton : null}
        </div>
      </div>
    );
  }

}

export default EditItem;
