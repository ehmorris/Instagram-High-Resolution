import React, { useState, useEffect } from 'react';
import UI from './UI';
import LoadingUI from './LoadingUI';
import { mediaAtPoint } from './mediaAtPoint';
import { getMediaUrl } from './getMediaUrl';
import { minimumImageWidth } from './constants';

function App() {
  const [mediaUrl, setMediaUrl] = useState(null);
  const [mediaRect, setMediaRect] = useState(null);
  const [fetchingMediaUrl, setFetchingMediaUrl] = useState(false);

  const resetApp = () => {
    setMediaUrl(null);
    setMediaRect(null);
    setFetchingMediaUrl(false);
  };

  const setMedia = ({ clientX: x, clientY: y }) => {
    resetApp();

    const mediaObject = mediaAtPoint(x, y);

    if (mediaObject && mediaObject.mediaRect.width > minimumImageWidth) {
      setMediaRect(mediaObject.mediaRect);
      setFetchingMediaUrl(true);

      getMediaUrl(mediaObject.mediaElement).then(mediaUrl => {
        setMediaUrl(mediaUrl);
        setFetchingMediaUrl(false);
      });
    }
  };

  useEffect(() => {
    document.addEventListener('click', setMedia, true);

    return () => document.removeEventListener('click', setMedia, true);
  });

  if (fetchingMediaUrl) {
    return <LoadingUI mediaRect={mediaRect} shouldUnmount={resetApp} />;
  } else if (mediaUrl && mediaRect) {
    return <UI url={mediaUrl} mediaRect={mediaRect} shouldUnmount={resetApp} />;
  } else {
    return null;
  }
}

export default App;
