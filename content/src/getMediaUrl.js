const pickSourceFromSrcset = (srcset, filterByConstraint) => {
  const srcsetArray = srcset.split(',');

  return srcsetArray.map((sourceAndConstraint) => {
    const [source, constraint] = sourceAndConstraint.split(' ');

    fetch(source)
      .then((response) => response.blob())
      .then((blob) => console.log(blob.size));


    if (constraint === filterByConstraint) return source;
  }).join('').trim();
};

const pickSourceFromSourceElements = (sources) => sources[0].src;

export const getMediaUrl = (media) => {
  if (media.srcset) {
    return pickSourceFromSrcset(media.srcset, '1080w');
  } else if (media.childElementCount) {
    return pickSourceFromSourceElements(media.children);
  } else {
    return media.src || media.currentSrc;
  }
};
