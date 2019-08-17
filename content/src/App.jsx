import React, {Component} from 'react';
import UI from './UI';
import { mediaAtPoint } from './mediaAtPoint';
import { getMediaUrl } from './getMediaUrl';
import { minimumImageWidth } from './constants';

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

      const mediaObject = mediaAtPoint(x, y);

      if (mediaObject && mediaObject.mediaRect.width > minimumImageWidth) {
        getMediaUrl(mediaObject.media).then((mediaUrl) => {
          this.setState({
            mediaUrl: mediaUrl,
            mediaRect: mediaObject.mediaRect
          });
        });
      }
    }, true);
  }

  render() {
    if (!this.state.mediaUrl) {
      return null;
    }

    return (
      <UI
        url={this.state.mediaUrl}
        mediaRect={this.state.mediaRect}
        shouldUnmount={this.resetApp}
      />
    );
  }
}

export default App;
