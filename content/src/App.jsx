import React, { useState, useEffect } from 'react';
import UI from './UI';
import { mediaAtPoint } from './mediaAtPoint';
import { getMediaUrl } from './getMediaUrl';
import { minimumImageWidth } from './constants';

function App() {
  const [mediaUrl, setMediaUrl] = useState(null);
  const [mediaRect, setMediaRect] = useState(null);

  const resetApp = () => {
    setMediaUrl(null);
    setMediaRect(null);
  };

  const setMedia = ({ clientX: x, clientY: y }) => {
    resetApp();

    const mediaObject = mediaAtPoint(x, y);

    if (mediaObject && mediaObject.mediaRect.width > minimumImageWidth) {
      getMediaUrl(mediaObject.mediaElement).then(mediaUrl => {
        setMediaUrl(mediaUrl);
        setMediaRect(mediaObject.mediaRect);
      });
    }
  };

  useEffect(() => {
    document.addEventListener('click', setMedia, true);

    return () => document.removeEventListener('click', setMedia, true);
  });

  return mediaUrl && mediaRect ? (
    <UI url={mediaUrl} mediaRect={mediaRect} shouldUnmount={resetApp} />
  ) : null;
}

export default App;
