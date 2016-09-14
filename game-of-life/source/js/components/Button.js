import React, { PropTypes } from 'react';

const Button = ({ text, disabled, iconClass, onClick }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      <i className={iconClass} aria-hidden="true" ></i>
      <span>{text}</span>
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  disabled: PropTypes.bool,
  iconClass: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Button;
