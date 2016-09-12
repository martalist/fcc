import React, { PropTypes } from 'react';

const Slider = ({ min, max, value, changeSpeed }) => {
  return (
    <div>
      <input 
        type="range"
        min={min}
        max={max}
        value={value}
        step="1"
        onChange={changeSpeed}
      />
    </div>
  );
};

Slider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.number,
  changeSpeed: PropTypes.func,
};

export default Slider;
