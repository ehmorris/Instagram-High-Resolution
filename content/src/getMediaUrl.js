const srcsetParser = require('srcset');

const pickBiggestSourceFromSrcset = (srcset) => {
  const sourcesWithBytesize = srcsetParser.parse(srcset).map((source) => {
    return fetch(source.url)
      .then((response) => response.blob())
      .then(({size: bytesize}) => Object.assign(source, {bytesize}));
  });

  return Promise.all(sourcesWithBytesize).then((sources) => {
    sources.sort((first, second) => {
      if(first.bytesize > second.bytesize) return -1;
      if(first.bytesize < second.bytesize) return 1;
      return 0;
    });

    return sources[0].url;
  });
};

const pickFirstSourceElement = (sources) =>
  Promise.resolve(sources[0].src);

export const getMediaUrl = (media) => {
  if (media.srcset) {
    return pickBiggestSourceFromSrcset(media.srcset);
  } else if (media.childElementCount) {
    return pickFirstSourceElement(media.children);
  } else {
    return Promise.resolve(media.src || media.currentSrc);
  }
};
