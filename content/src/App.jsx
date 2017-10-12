import React, {Component} from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mediaUrl: null,
      mediaRect: null
    }
  }

  componentDidMount() {
    document.addEventListener('click', ({clientX: x, clientY: y}) => {
      const elements = this.allElementsAtPoint(x, y);
      const mediaElement = elements.find(({tagName: tag}) => ['IMG', 'VIDEO'].includes(tag));

      if (mediaElement) {
        this.setState({
          mediaUrl: this.assetUrl(mediaElement),
          mediaRect: mediaElement.getClientRects()[0]
        });

        this.copyToClipboard();
      }
    });
  }

  copyToClipboard() {
    this.textInput.value = this.state.mediaUrl;
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

  pickSourceFromSrcset(srcset, filterByConstraint) {
    return srcset.map((sourceAndConstraint) => {
      const [source, constraint] = sourceAndConstraint.split(' ');
      if (constraint === filterByConstraint) return source;
    }).join('').trim();
  }

  assetUrl(asset) {
    if (asset.srcset) {
      return this.pickSourceFromSrcset(asset.srcset.split(','), '1080w');
    } else {
      return asset.src;
    }
  }

  render() {
    const noticeStyle = {
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
            <a download style={noticeStyle} href={this.state.mediaUrl}>Download</a>
            <a style={noticeStyle} target="_blank" href={this.state.mediaUrl}>Open in tab</a>
          </div>
        }
      </div>
    );
  }
}

export default App;
