import React, { PropTypes } from 'react';
import './index.scss';

function colorClass(age) {
  switch (age) {
    case 0:
      return "cell-dead";
    case 1:
      return "cell-young";
    default:
      return "cell-old";
  }
}

const Cell = ({ age }) => {
  return (
    <div
      className={`cell ${colorClass(age)}`}
    >
    </div>
  );
};

Cell.propTypes = {
  age: PropTypes.number.isRequired,
  style: PropTypes.object,
};

export default Cell;
