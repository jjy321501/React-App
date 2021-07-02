import React from 'react';
import classNames from 'classnames';
import './Button.scss';

function Button({ children, size, color, outline, fullWidth, onClick }) {
  return (
    <button
      className={classNames('Button', size, color, { outline, fullWidth })}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  size: 'medium',
  color: 'blue'
};

export default Button;