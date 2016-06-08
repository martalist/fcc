'use strict';
import React from 'react';

const Item = ({text}) => (
  <li>{text}</li>
);

class List extends React.Component {
  render() {
    const { ordered, items, heading } = this.props;
    const itemList = items.map(
      (item, index) => <Item key={index} text={item} />
    );
    return (
      <div className="col-sm-12 col-md-6">
        <h3>{heading}</h3>
        {( ordered ?
          <ol>{itemList}</ol> :
          <ul>{itemList}</ul> )}
      </div>
    );
  }

}

export default List;
