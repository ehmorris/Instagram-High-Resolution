const srcsetParser = require('srcset');
const jsonPath = require('jsonpath');

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

const getIGID = () => {
  const sortedArray = location.pathname
    .split('/')
    .filter(i => i.length && i !== 'p')
    .sort((a, b) => b.length - a.length);
  return sortedArray[0];
};

const getGraphQLResponse = id => {
  const endpoint = 'https://www.instagram.com/p';
  const params = '?__a=1';
  const url = [endpoint, id, params].join('/');
  return fetch(url).then(response => response.json());
};

const pickFirstSourceElement = sources => Promise.resolve(sources[0].src);

const mediaIsVideoBlob = media =>
  (media.src || media.currentSrc).slice(0, 5) === 'blob:';

export const getMediaUrl = media => {
  if (media.srcset) {
    return pickBiggestSourceFromSrcset(media);
  } else if (media.childElementCount) {
    return pickFirstSourceElement(media.children);
  } else if (mediaIsVideoBlob(media)) {
    const id = getIGID();
    return getGraphQLResponse(id).then(
      response => jsonPath(response, '$..video_url')[0]
    );
  } else {
    return Promise.resolve(media.src || media.currentSrc);
  }
};
