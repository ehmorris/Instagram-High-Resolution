import React, {Component} from 'react';
import Button from './Button';
import Notice from './Notice';

class Buttons extends Component {
  render() {
    const containerStyle = {
      color: '#fff',
      cursor: 'default',
      fontFamily: '-apple-system, system-ui, sans-serif',
      fontSize: '12px',
      fontWeight: '600',
      transformOrigin: 'center',
      userSelect: 'none',
      whiteSpace: 'nowrap'
    }

    return (
      <div style={containerStyle}>
        <Notice>URL COPIED</Notice>

        <Button
          href={this.props.url}
          download
        >DOWNLOAD</Button>

        <Button
          href={this.props.url}
          target="_blank"
        >OPEN IN TAB</Button>
      </div>
    );
  }
}

export default Buttons;
