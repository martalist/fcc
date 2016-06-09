'use strict';
import React from 'react';
import EditItem from './EditItem.jsx';

class EditList extends React.Component {
  render() {
    const { ordered, items, heading, refHandler, name } = this.props;
    const itemList = items.map(
      (item, index) => <EditItem
                          key={index}
                          text={item}
                          i={index + 1}
                          name={name}
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
