import React, { useState, useEffect } from 'react';
import Frame from 'react-frame-component';
import Buttons from './Buttons';
import CopyToClipboard from './CopyToClipboard';
import { minTopValue } from './constants';

function UI({mediaRect, url, shouldUnmount}) {
  const [top, setTop] = useState(mediaRect.top);
  const [initialTopOffset, setInitialTopOffset] = useState(mediaRect.top);

  const handleScroll = (event) => {
    const pixelsTraveled = window.scrollY - initialTopOffset;
    const newTop = top - pixelsTraveled;
    setTop(newTop);

    if (newTop < minTopValue) {
      shouldUnmount();
    }
  };

  useEffect(() => {
    setInitialTopOffset(window.scrollY);

    if (top < minTopValue) shouldUnmount();

    document.addEventListener('scroll', handleScroll, { passive: true });

    return () => document.removeEventListener('scroll', handleScroll);
  });

  return (
    <div
      style={{
        position: 'fixed',
        top: `${top}px`,
        left: `${mediaRect.left}px`,
        overflow: 'hidden',
        width: '340px',
        height: '60px',
        zIndex: '100'
      }}
    >
      <CopyToClipboard content={url} />
      <Frame>
        <Buttons url={url} />
      </Frame>
    </div>
  );
}

export default UI;
