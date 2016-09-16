import React, { PropTypes } from 'react';
import './index.scss';

function colorClass(age) {
  switch (age) {
    case 0:
      return "dead";
    case 1:
      return "young";
    case 2:
      return "one";
    default:
      return "old";
  }
}

const Cell = ({ age, onClick }) => {
  return (
    <div
      className={`cell ${colorClass(age)}`}
      onClick={onClick}
    >
    </div>
  );
};

Cell.propTypes = {
  age: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Cell;
