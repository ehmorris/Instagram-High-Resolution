import React, { useRef, useEffect } from 'react';

function CopyToClipboard({ content }) {
  const urlContainerElement = useRef(null);

  useEffect(() => {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(urlContainerElement.current);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
    selection.removeAllRanges();
  });

  return (
    <div
      style={{
        opacity: '0',
        pointerEvents: 'none',
        position: 'absolute',
      }}
      ref={urlContainerElement}
    >
      {content}
    </div>
  );
}

export default CopyToClipboard;
