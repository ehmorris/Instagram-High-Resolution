import React, { Component } from 'react';
import Button from './Button';
import Notice from './Notice';

class LoadingMessage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appCopy__Loading: this.getTranslation('appCopy__Loading'),
    };
  }

  getTranslation(key) {
    return chrome.i18n.getMessage(key);
  }

  render() {
    const containerStyle = {
      color: '#fff',
      cursor: 'default',
      fontFamily: '-apple-system, system-ui, sans-serif',
      fontSize: '12px',
      fontWeight: '600',
      transformOrigin: 'center',
      userSelect: 'none',
      whiteSpace: 'nowrap',
    };

    return (
      <div style={containerStyle}>
        <Notice>{this.state.appCopy__Loading}</Notice>
      </div>
    );
  }
}

export default LoadingMessage;
