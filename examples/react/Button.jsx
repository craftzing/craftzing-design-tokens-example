import React from 'react';
import styles from './Button.module.css';
import '../../dist/token-studio/css/tokens.css';

const Button = ({ children, ...rest }) => {
  return (
    <button className={styles['button']} {...rest}>
      {children}
    </button>
  );
};

export default Button;
