import React, {Component} from 'react';

class Notice extends Component {
  render() {
    const noticeStyle = {
      float: 'left',
      fontWeight: 'bold',
      margin: '.5rem 0 0 .5rem',
      padding: '.25rem .5rem',
      textShadow: '0 0 .25rem #000',
    };

    return (
      <div
        style={noticeStyle}
        {...this.props}
      >{this.props.children}</div>
    );
  }
}

export default Notice;
