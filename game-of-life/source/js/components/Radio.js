import React, { PropTypes } from 'react';

const Radio = ({ group, label, checked, onChange }) => {
  return (
    <label key={label}>
      <input 
        type="radio" 
        name={group}
        checked={checked}
        onChange={onChange}
      />
        {label}
    </label>
  );
};

Radio.propTypes = {
  group: PropTypes.string.isRequired,
  label: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Radio;
