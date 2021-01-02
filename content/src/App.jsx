import React, { useState, useEffect } from 'react';
import Frame from 'react-frame-component';
import StickyScrollingContainer from './StickyScrollingContainer';
import CopyToClipboard from './CopyToClipboard';
import LoadingMessage from './LoadingMessage';
import Buttons from './Buttons';
import { mediaAtPoint } from './mediaAtPoint';
import { getMediaUrl } from './getMediaUrl';
import { minimumImageWidth } from './constants';

function App() {
  const [mediaUrl, setMediaUrl] = useState(null);
  const [mediaRect, setMediaRect] = useState(null);
  const [fetchingMediaUrl, setFetchingMediaUrl] = useState(false);
  let loaderTimeout;

  const resetApp = () => {
    window.clearTimeout(loaderTimeout);
    setMediaUrl(null);
    setMediaRect(null);
    setFetchingMediaUrl(false);
  };

  const setMedia = ({ clientX: x, clientY: y }) => {
    resetApp();

    const mediaObject = mediaAtPoint(x, y);

    if (mediaObject && mediaObject.mediaRect.width > minimumImageWidth) {
      setMediaRect(mediaObject.mediaRect);

      loaderTimeout = window.setTimeout(() => setFetchingMediaUrl(true), 500);

      getMediaUrl(mediaObject.mediaElement).then(
        mediaUrl => {
          window.clearTimeout(loaderTimeout);
          if (mediaUrl === 'empty') {
            resetApp();
          } else {
            setMediaUrl(mediaUrl);
            setFetchingMediaUrl(false);
          }
        },
        () => {
          window.clearTimeout(loaderTimeout);
        }
      );
    }
  };

  useEffect(() => {
    document.addEventListener('click', setMedia, true);

    return () => {
      window.clearTimeout(loaderTimeout);
      document.removeEventListener('click', setMedia, true);
    };
  });

  if (!mediaRect) {
    return null;
  } else if (fetchingMediaUrl) {
    return (
      <StickyScrollingContainer mediaRect={mediaRect} shouldUnmount={resetApp}>
        <Frame>
          <LoadingMessage />
        </Frame>
      </StickyScrollingContainer>
    );
  } else if (mediaUrl) {
    return (
      <StickyScrollingContainer mediaRect={mediaRect} shouldUnmount={resetApp}>
        <CopyToClipboard content={mediaUrl} />
        <Frame>
          <Buttons url={mediaUrl} />
        </Frame>
      </StickyScrollingContainer>
    );
  } else {
    return null;
  }
}

export default App;
