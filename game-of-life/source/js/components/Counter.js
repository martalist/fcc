import React, { PropTypes } from 'react';

const Counter = ({ count, description }) => {
  return (
    <div className="counter">
      <span className="counter-number">{count}</span>
      <span className="counter-desc"> {description.toUpperCase()}</span>
    </div>
  );
};

Counter.propTypes = {
  description: PropTypes.string,
  count: PropTypes.number,
};

export default Counter;
