import React from 'react';

function Button(props) {
  const buttonStyle = {
    background: props.disabled ? '#ddd' : '#fff',
    color: '#000',
    display: 'block',
    float: 'left',
    letterSpacing: '1px',
    margin: '.5rem 0 0 .5rem',
    padding: '.25rem .5rem',
    textDecoration: 'none',
  };

  return (
    <a style={buttonStyle} {...props}>
      {props.children}
    </a>
  );
}

export default Button;
