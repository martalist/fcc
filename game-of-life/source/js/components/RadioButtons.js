import React, { PropTypes } from 'react';
import { SIZES } from '../constants';
import Radio from './Radio';

const RadioButtons = ({ boardHeight, boardWidth, onChange }) => {
  return (
    <form>
      {Object.keys(SIZES).map(size => {
        const { width, height, label } = SIZES[size];
        return (
          <Radio
            key={label}
            group="sizes"
            label={label}
            checked={width === boardWidth && height === boardHeight} 
            onChange={() => onChange(width, height)} 
          />
        )
      })}
    </form>
  );
};

RadioButtons.propTypes = {
  boardHeight: PropTypes.number.isRequired,
  boardWidth: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default RadioButtons;
