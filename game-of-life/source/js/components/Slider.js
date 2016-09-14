import React, { PropTypes } from 'react';
import { MIN_SPEED, MAX_SPEED } from '../constants';

const Slider = ({ speed, changeSpeed }) => {
  return (
    <div>
      <input 
        type="range"
        min={MIN_SPEED}
        max={MAX_SPEED}
        value={speed}
        step="1"
        onChange={changeSpeed}
      />
      <span>{speed}ms</span>
    </div>
  );
};

Slider.propTypes = {
  speed: PropTypes.number.isRequired,
  changeSpeed: PropTypes.func.isRequired,
};

export default Slider;
