import { slideshowButtonSize, maximumElementStackSize } from './constants';

const elementIsSlideshowButton = (element) =>
  !element.href
  && element.clientHeight <= slideshowButtonSize
  && element.clientWidth <= slideshowButtonSize;

const terminateElementLoop = (element, elementStack) =>
  ['HTML', 'BODY'].includes(element.tagName) ||
  elementIsSlideshowButton(element) ||
  elementStack.length > maximumElementStackSize;

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
// `overflow: hidden;` property. If a clipping parent exists, and
// it's smaller than the video or image, we can use the parent's
// bounds to position the extension UI.
const getClippingParentRect = (mediaRect, elementStack) => {
  return elementStack.map((element) => {
    const hasOverflowProperty = getComputedStyle(element).overflow === 'hidden';

    if (hasOverflowProperty) {
      const parentRect = element.getClientRects()[0];

      if (parentRect.height < mediaRect.height) {
        return parentRect;
      }
    }

    return null;
  }).find((rect) => rect !== null);
};

const getMediaRect = (mediaElement, elementStack) => {
  const mediaRect = mediaElement.getClientRects()[0];
  const clippingParentRect = getClippingParentRect(mediaRect, elementStack);

  return clippingParentRect ? clippingParentRect : mediaRect;
};

export const mediaAtPoint = (x, y) => {
  const elementStack = allElementsAtPoint(x, y);
  const videos = elementStack.filter(({tagName: tag}) => tag === 'VIDEO');
  const images = elementStack.filter(({tagName: tag}) => tag === 'IMG');

  if (videos.length || images.length) {
    const mediaElement = videos.length ? videos[0] : images[0];
    const mediaRect = getMediaRect(mediaElement, elementStack);

    return {mediaElement, mediaRect};
  }
};
