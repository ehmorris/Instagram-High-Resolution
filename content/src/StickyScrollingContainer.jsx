import React, { useState, useEffect } from 'react';

function StickyScrollingContainer({ children, mediaRect, shouldUnmount }) {
  const [top, setTop] = useState(mediaRect.top);
  const [initialTopOffset, setInitialTopOffset] = useState(mediaRect.top);
  const minTopValue = -20;

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

    if (top < minTopValue) {
      shouldUnmount();
    }

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
        zIndex: '9999',
      }}
    >
      {children}
    </div>
  );
}

export default StickyScrollingContainer;
