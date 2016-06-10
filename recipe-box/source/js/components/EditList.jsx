'use strict';
import React from 'react';
import EditItem from './EditItem.jsx';

class EditList extends React.Component {
  render() {
    const { ordered, currentRecipe, heading, inputGroup } = this.props,
          { handleInput, handleDelete, handleAdd } = this.props,
          itemList = currentRecipe[inputGroup].map(
      (item, index) => <EditItem
                          key={index}
                          text={item}
                          index={index + 1}
                          inputGroup={inputGroup}
                          handleInput={handleInput}
                          handleDelete={handleDelete}
                          deletable />
    );
    return (
      <div className="col-sm-12">
        <h3 className="text-center">{heading}</h3>
        {itemList}
        <button
          className="btn btn-default btn-sm"
          type="button"
          name={"add-" + inputGroup}
          onClick={handleAdd} >
            <i className="fa fa-plus" aria-hidden="true"></i>
            <span>Add</span>
        </button>
      </div>
    );
  }
}

export default EditList;
