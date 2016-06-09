'use strict';
import React from 'react';
import EditItem from './EditItem.jsx';

class EditList extends React.Component {
  render() {
    const { ordered, currentRecipe, heading, inputGroup, handleInput } = this.props,
          itemList = currentRecipe[inputGroup].map(
      (item, index) => <EditItem
                          key={index}
                          text={item}
                          index={index + 1}
                          inputGroup={inputGroup}
                          handleInput={handleInput}
                          deletable />
    );
    return (
      <div className="col-sm-12">
        <h3 className="text-center">{heading}</h3>
        {itemList}
      </div>
    );
  }
}

export default EditList;
