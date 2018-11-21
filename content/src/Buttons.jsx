import React, {Component} from 'react';
import Button from './Button';
import Notice from './Notice';

class Buttons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blobUrl: null,
      blobLoading: false,
    };
  }

  componentDidMount() {
    this.mounted = true;

    this.loadingTimeout = window.setTimeout(() => {
      this.setState({
        blobLoading: true,
      });
    }, 700);

    this.convertUrlToBlobUrl(this.props.url)
      .then((blobUrl) => {
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
      .then((response) => response.blob())
      .then((blob) => URL.createObjectURL(blob));
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
      whiteSpace: 'nowrap'
    }

    return (
      <div style={containerStyle}>
        <Notice>URL COPIED</Notice>

        <Button
          href={this.state.blobUrl}
          download
          disabled={this.state.blobLoading}
        >{this.state.blobLoading ? 'LOADING…' : 'DOWNLOAD'}</Button>

        <Button
          href={this.props.url}
          target="_blank"
        >OPEN IN TAB</Button>
      </div>
    );
  }
}

export default Buttons;
