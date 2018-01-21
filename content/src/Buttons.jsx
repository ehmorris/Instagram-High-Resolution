import React, {Component} from 'react';
import Button from './Button';
import Notice from './Notice';

class Buttons extends Component {
  render() {
    const containerStyle = {
      animation: 'scaleIn .1s ease',
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
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(.8);
            }
            to {
              opacity: 1,
              transform: scale(1);
            }
          }
        `}} />

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
