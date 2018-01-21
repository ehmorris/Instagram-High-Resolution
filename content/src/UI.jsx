import React, {Component} from 'react';
import Frame from 'react-frame-component';
import Buttons from './Buttons';
import CopyToClipboard from './CopyToClipboard';

class UI extends Component {
  constructor(props) {
    super(props);

    this.handleScroll = this.handleScroll.bind(this);
    this.state = { top: this.props.mediaRect.top };
  }

  componentDidMount() {
    this.initialTopOffset = window.scrollY;
    this.initialTop = this.state.top;
    document.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(event) {
    const pixelsTraveled = window.scrollY - this.initialTopOffset;
    const newTop = this.initialTop - pixelsTraveled;
    this.setState({ top: newTop });

    if (newTop < -150) {
      this.props.shouldUnmount();
    }
  }

  render() {
    return (
      <div
        style={{
          position: 'fixed',
          zIndex: '100',
          top: `${this.state.top}px`,
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

