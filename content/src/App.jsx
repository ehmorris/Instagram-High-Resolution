import React, {Component} from 'react';
import UI from './UI';

class App extends Component {
  constructor(props) {
    super(props);

    this.resetApp = this.resetApp.bind(this);
    this.state = { mediaUrl: null, mediaRect: null }
  }

  resetApp() {
    this.setState({ mediaUrl: null, mediaRect: null });
  }

  componentDidMount() {
    document.addEventListener('click', ({clientX: x, clientY: y}) => {
      this.resetApp();

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

  pickSourceFromSourceElements(sources) {
    return sources[0].src;
  }

  getMediaUrl(media) {
    if (media.srcset) {
      return this.pickSourceFromSrcset(media.srcset, '1080w');
    } else if (media.childElementCount) {
      return this.pickSourceFromSourceElements(media.children);
    } else {
      return media.src || media.currentSrc;
    }
  }

  render() {
    if (this.state.mediaUrl) {
      return (
        <UI
          url={this.state.mediaUrl}
          mediaRect={this.state.mediaRect}
          shouldUnmount={this.resetApp}
        />
      );
    }

    return null;
  }
}

export default App;
