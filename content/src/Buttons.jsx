import React, { Component } from 'react';
import Button from './Button';
import Notice from './Notice';

class Buttons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blobUrl: null,
      blobLoading: false,
      appCopy__Download: this.getTranslation('appCopy__Download'),
      appCopy__URLCopied: this.getTranslation('appCopy__URLCopied'),
      appCopy__OpenInTab: this.getTranslation('appCopy__OpenInTab'),
      appCopy__Loading: this.getTranslation('appCopy__Loading'),
    };
  }

  getTranslation(key) {
    return chrome.i18n.getMessage(key);
  }

  componentDidMount() {
    this.mounted = true;

    this.loadingTimeout = window.setTimeout(() => {
      this.setState({
        blobLoading: true,
      });
    }, 700);

    this.convertUrlToBlobUrl(this.props.url).then(blobUrl => {
      window.clearTimeout(this.loadingTimeout);
      if (this.mounted) {
        this.setState({
          blobUrl: blobUrl,
          blobLoading: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
    window.clearTimeout(this.loadingTimeout);
  }

  convertUrlToBlobUrl(url) {
    return fetch(url)
      .then(response => response.blob())
      .then(blob => URL.createObjectURL(blob));
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

    const fileURL = new URL(this.props.url);
    const fileName = fileURL.pathname.split('/').pop();

    return (
      <div style={containerStyle}>
        <Notice>{this.state.appCopy__URLCopied}</Notice>

        <Button
          href={this.state.blobUrl}
          download={fileName}
          disabled={this.state.blobLoading}
        >
          {this.state.blobLoading
            ? this.state.appCopy__Loading
            : this.state.appCopy__Download}
        </Button>

        <Button href={this.props.url} target="_blank">
          {this.state.appCopy__OpenInTab}
        </Button>
      </div>
    );
  }
}

export default Buttons;
