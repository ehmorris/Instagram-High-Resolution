import React, {Component} from 'react';
import Button from './Button';
import Notice from './Notice';

class Buttons extends Component {
  render() {
    const containerStyle = {
      color: '#fff',
      cursor: 'default',
      fontFamily: '-apple-system, system-ui, sans-serif',
      fontSize: '14px',
      transformOrigin: 'center',
      userSelect: 'none',
      whiteSpace: 'nowrap'
    }

    return (
      <div style={containerStyle}>
        <Notice>Copied!</Notice>

        <Button
          href={this.props.url}
          download
        >Download</Button>

        <Button
          href={this.props.url}
          target="_blank"
        >Open in tab</Button>
      </div>
    );
  }
}

export default Buttons;
