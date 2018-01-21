import React, {Component} from 'react';

class Button extends Component {
  render() {
    const buttonStyle = {
      background: 'rgba(0, 0, 0, .75)',
      borderRadius: '.25rem',
      color: 'inherit',
      display: 'block',
      float: 'left',
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
