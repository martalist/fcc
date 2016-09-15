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
  style: PropTypes.object,
  onClick: PropTypes.func.isRequired,
};

export default Cell;
