import React, {Component} from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { mediaUrl: null, mediaRect: null }
  }

  componentDidMount() {
    document.addEventListener('click', ({clientX: x, clientY: y}) => {
      this.setState({ mediaUrl: null, mediaRect: null });

      const mediaElement = this.mediaAtPoint(x, y);

      if (mediaElement) {
        const mediaRect = mediaElement.getClientRects()[0];
        const mediaUrl = this.assetUrl(mediaElement);

        if (mediaRect.width > 350) {
          this.setState({ mediaUrl: mediaUrl, mediaRect: mediaRect });
          this.copyToClipboard(mediaUrl);
        }
      }
    }, true);
  }

  copyToClipboard(text) {
    this.textInput.value = text;
    this.textInput.select();
    document.execCommand('Copy');
  }

  terminateElementLoop(element, elements) {
    return (
      ['HTML', 'BODY', 'IMG', 'VIDEO'].includes(element.tagName) ||
      elements.length > 20
    );
  }

  allElementsAtPoint(x, y) {
    let stack = [], element;

    do {
      element = document.elementFromPoint(x, y);
      stack.push(element);
      element.style.pointerEvents = 'none';
    } while (!this.terminateElementLoop(element, stack));

    stack.map((stackItem) => stackItem.style.pointerEvents = 'auto');

    return stack;
  }

  mediaAtPoint(x, y) {
    const elements = this.allElementsAtPoint(x, y);
    return elements.find(({tagName: tag}) => ['IMG', 'VIDEO'].includes(tag));
  }

  pickSourceFromSrcset(srcset, filterByConstraint) {
    const srcsetArray = srcset.split(',');

    return srcsetArray.map((sourceAndConstraint) => {
      const [source, constraint] = sourceAndConstraint.split(' ');
      if (constraint === filterByConstraint) return source;
    }).join('').trim();
  }

  assetUrl(asset) {
    if (asset.srcset) {
      return this.pickSourceFromSrcset(asset.srcset, '1080w');
    } else {
      return asset.src;
    }
  }

  render() {
    const noticeStyle = {
      textShadow: '0px 0px 4px #000',
      padding: '.2em .5em',
      display: 'block',
      fontWeight: 'bold',
      float: 'left',
      color: '#fff',
      margin: '16px 0 0 16px'
    };

    const buttonStyle = {
      background: 'rgba(0, 0, 0, .7)',
      padding: '.2em .5em',
      display: 'block',
      float: 'left',
      color: '#fff',
      borderRadius: '3px',
      margin: '16px 0 0 16px'
    };

    return (
      <div>
        <input
          style={{
            position: 'absolute',
            opacity: '0',
            pointerEvents: 'none'
          }}
          ref={(input) => { this.textInput = input; }}
          type="text"
        />

        {this.state.mediaUrl &&
          <div
            style={{
              userSelect: 'none',
              cursor: 'default',
              position: 'absolute',
              display: 'block',
              zIndex: '99',
              top: `${this.state.mediaRect.top + window.scrollY}px`,
              left: `${this.state.mediaRect.left}px`
            }}
          >
            <div style={noticeStyle}>Copied!</div>
            <a download style={buttonStyle} href={this.state.mediaUrl}>Download</a>
            <a style={buttonStyle} target="_blank" href={this.state.mediaUrl}>Open in tab</a>
          </div>
        }
      </div>
    );
  }
}

export default App;
