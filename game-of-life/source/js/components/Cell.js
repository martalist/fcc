import React, { PropTypes } from 'react';

function getColor(age) {
  switch (age) {
    case 0:
      return "white";
    case 1:
      return "pink";
    default:
      return "red";
  }
}

const Cell = ({ age, style }) => {
  return (
    <div
      style={Object.assign(
        {},
        {"backgroundColor": getColor(age)},
        style
      )}
    >
    </div>
  );
};

Cell.propTypes = {
  age: PropTypes.number.isRequired,
  style: PropTypes.object,
};

export default Cell;
