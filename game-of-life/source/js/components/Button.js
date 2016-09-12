import React from 'react';

const Button = ({ text, iconClass }) => {
  return (
    <button>
      <i className={iconClass} aria-hidden="true" ></i>
      <span>{text}</span>
    </button>
  );
};

export default Button;
