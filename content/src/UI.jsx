import React, {Component} from 'react';
import Frame from 'react-frame-component';
import Buttons from './Buttons';
import CopyToClipboard from './CopyToClipboard';

const minTopValue = 35;

class UI extends Component {
  constructor(props) {
    super(props);

    this.handleScroll = this.handleScroll.bind(this);
    this.state = { top: this.props.mediaRect.top };
  }

  componentDidMount() {
    this.initialTopOffset = window.scrollY;
    this.initialTop = this.state.top;

    if (this.initialTop < minTopValue) {
      this.props.shouldUnmount();
    }

    document.addEventListener('scroll', this.handleScroll, { passive: true });
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(event) {
    const pixelsTraveled = window.scrollY - this.initialTopOffset;
    const newTop = this.initialTop - pixelsTraveled;
    this.setState({ top: newTop });

    if (newTop < minTopValue) {
      this.props.shouldUnmount();
    }
  }

  render() {
    return (
      <div
        style={{
          position: 'fixed',
          top: `${this.state.top}px`,
          left: `${this.props.mediaRect.left}px`,
          overflow: 'hidden',
          width: '340px',
          height: '60px',
          zIndex: '100'
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
