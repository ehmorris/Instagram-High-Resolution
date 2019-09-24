import React, { useState, useEffect } from 'react';
import Frame from 'react-frame-component';
import LoadingMessage from './LoadingMessage';
import CopyToClipboard from './CopyToClipboard';
import { minTopValue } from './constants';

function LoadingUI({ mediaRect, shouldUnmount }) {
  const [top, setTop] = useState(mediaRect.top);
  const [initialTopOffset, setInitialTopOffset] = useState(mediaRect.top);

  const handleScroll = event => {
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
        zIndex: '100',
      }}
    >
      <Frame>
        <LoadingMessage />
      </Frame>
    </div>
  );
}

export default LoadingUI;

