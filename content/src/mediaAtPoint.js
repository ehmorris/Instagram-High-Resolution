import { slideshowButtonSize, maximumElementStackSize } from './constants';

const elementIsSlideshowButton = (element) =>
  !element.href
  && element.clientHeight <= slideshowButtonSize
  && element.clientWidth <= slideshowButtonSize;

const terminateElementLoop = (element, elements) =>
  ['HTML', 'BODY'].includes(element.tagName) ||
  elementIsSlideshowButton(element) ||
  elements.length > maximumElementStackSize;

const allElementsAtPoint = (x, y) => {
  let stack = [], element;

  do {
    element = document.elementFromPoint(x, y);
    stack.push(element);
    element.style.pointerEvents = 'none';
  } while (!terminateElementLoop(element, stack));

  stack.map((stackItem) => stackItem.style.pointerEvents = 'auto');

  return stack;
};

// On some stories, on the web, Instagram is applying a slow zoom
// effect. To accomplish the effect, they're serving a
// taller-than-normal image, placing it within an `overflow: hidden`
// container, and adding keyframes to the image that slowly change
// its scale.
//
// This method searches an element's parents for the
// `overflow: hidden;` property. If a clipping parent exists, we can
// use that parent's bounds to position the extension UI rather than
// the clipped image's bounds.
const clippingElements = (element_stack) => {
  return element_stack.filter(element => {
    const elementIsFullWidth = element.clientWidth === window.innerWidth;
    return elementIsFullWidth ? false : getComputedStyle(element).overflow === 'hidden';
  });
};

const getMediaRect = (media, elements) => {
  const clippingParents = clippingElements(elements);
  const clippingParent = clippingParents.length > 0 ? clippingParents[0] : null;

  return clippingParent
    ? clippingParent.getClientRects()[0]
    : media.getClientRects()[0];
};

export const mediaAtPoint = (x, y) => {
  const elements = allElementsAtPoint(x, y);
  const videos = elements.filter(({tagName: tag}) => tag === 'VIDEO');
  const images = elements.filter(({tagName: tag}) => tag === 'IMG');

  if (videos.length || images.length) {
    const media = videos.length ? videos[0] : images[0];
    const mediaRect = getMediaRect(media, elements);

    return {media, mediaRect};
  }
};
