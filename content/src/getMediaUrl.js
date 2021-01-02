const srcsetParser = require('srcset');

const srcsetIncludesSrc = (srcset, src) => {
  const sources = srcsetParser
    .parse(srcset)
    .map(source => {
      return source.url;
    })
    .includes(src);
};

const pickBiggestSourceFromSrcset = ({ srcset, src }) => {
  const allSources = srcsetIncludesSrc(srcset, src)
    ? srcsetParser.parse(srcset)
    : srcsetParser.parse(srcset).concat([{ url: src }]);

  const sourcesWithBytesize = allSources.map(source => {
    return fetch(source.url)
      .then(response => response.blob())
      .then(({ size: bytesize }) => Object.assign(source, { bytesize }));
  });

  return Promise.all(sourcesWithBytesize).then(sources => {
    sources.sort((first, second) => {
      if (first.bytesize > second.bytesize) return -1;
      if (first.bytesize < second.bytesize) return 1;
      return 0;
    });

    return sources[0].url;
  });
};

const pickFirstSourceElement = sources => Promise.resolve(sources[0].src);

const mediaIsVideoBlob = media =>
  (media.src || media.currentSrc).slice(0, 5) === 'blob:';

const onPhotoPage = () => window.location.pathname.slice(0, 3) === '/p/';

const injectScript = () => {
  const injectedScriptElement = document.createElement('script');
  injectedScriptElement.src = chrome.runtime.getURL('injected_script.js');
  document.documentElement.appendChild(injectedScriptElement);
};

export const getMediaUrl = media => {
  if (media.srcset) {
    return pickBiggestSourceFromSrcset(media);
  } else if (media.childElementCount) {
    return pickFirstSourceElement(media.children);
  } else if (mediaIsVideoBlob(media)) {
    // Unclear how to get the video url when the video appears in the feed or a
    // modal. Returning an empty string in those cases and handling that in App.jsx
    if (onPhotoPage()) {
      const injectionScriptChannel = new BroadcastChannel(
        'HRDFI_extension_script_communication_channel'
      );

      return new Promise(resolve => {
        injectionScriptChannel.onmessage = ({ data: { video_url } }) =>
          resolve(video_url);

        injectScript();
      });
    } else {
      return Promise.resolve('empty');
    }
  } else {
    return Promise.resolve(media.src || media.currentSrc);
  }
};
