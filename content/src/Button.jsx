import React, {Component} from 'react';

class Button extends Component {
  render() {
    const buttonStyle = {
      background: '#fff',
      color: '#000',
      display: 'block',
      float: 'left',
      letterSpacing: '1px',
      margin: '.5rem 0 0 .5rem',
      padding: '.25rem .5rem',
      textDecoration: 'none'
    };

    return (
      <a
        style={buttonStyle}
        {...this.props}
      >{this.props.children}</a>
    );
  }
}

export default Button;
