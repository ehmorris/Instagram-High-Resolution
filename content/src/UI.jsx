import React, {Component} from 'react';
import Frame from 'react-frame-component';
import Buttons from './Buttons';
import CopyToClipboard from './CopyToClipboard';

class UI extends Component {
  render() {
    return (
      <div
        style={{
          position: 'fixed',
          zIndex: '100',
          top: `${this.props.mediaRect.top}px`,
          left: `${this.props.mediaRect.left}px`,
          width: `${this.props.mediaRect.width}px`,
          height: `${this.props.mediaRect.height}px`,
          background: 'rgba(255, 0, 0, .5)'
        }}
      >
        <CopyToClipboard content={this.props.url} />
        <Frame>
          <Buttons url={this.props.url} />
        </Frame>
      </div>
    );
  }
}

export default UI;

