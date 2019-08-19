import React from 'react';

function Notice(props) {
  const noticeStyle = {
    animation: 'scaleIn .1s ease',
    float: 'left',
    letterSpacing: '1px',
    margin: '.5rem 0 0',
    padding: '.25rem .5rem',
    textShadow: '1px 2px 0 #000',
  };

  return (
    <div
      style={noticeStyle}
      {...props}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(.8);
          }
          to {
            opacity: 1,
            transform: scale(1);
          }
        }
      `}} />
      {props.children}
    </div>
  );
}

export default Notice;
