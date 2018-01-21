import React, {Component} from 'react';
import Frame from 'react-frame-component';
import UI from './UI';
import CopyToClipboard from './CopyToClipboard';

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
        const mediaUrl = this.getMediaUrl(mediaElement);

        if (mediaRect.width > 350) {
          this.setState({ mediaUrl: mediaUrl, mediaRect: mediaRect });
        }
      }
    }, true);
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

  getMediaUrl(media) {
    if (media.srcset) {
      return this.pickSourceFromSrcset(media.srcset, '1080w');
    } else {
      return media.src;
    }
  }

  render() {
    if (!this.state.mediaUrl) return false;

    return (
      <div
        style={{
          position: 'fixed',
          zIndex: '100',
          top: `${this.state.mediaRect.top}px`,
          left: `${this.state.mediaRect.left}px`
        }}
      >
        <CopyToClipboard content={this.state.mediaUrl} />
        <Frame>
          <UI url={this.state.mediaUrl} />
        </Frame>
      </div>
    );
  }
}

export default App;
