import { Axis } from './types';

const elementCouldBeVScrolled = (node: HTMLElement): boolean => {
  const styles = window.getComputedStyle(node);
  return (
    styles.overflowY !== 'hidden' && // not-not-scrollable
    !(styles.overflowY === styles.overflowX && styles.overflowY === 'visible') // scrollable
  );
};

const elementCouldBeHScrolled = (node: HTMLElement): boolean => {
  const styles = window.getComputedStyle(node);
  return (
    styles.overflowX !== 'hidden' && // not-not-scrollable
    !(styles.overflowY === styles.overflowX && styles.overflowX === 'visible') // scrollable
  );
};

export const locationCouldBeScrolled = (
  axis: Axis,
  node: HTMLElement
): boolean => {
  let current = node;
  do {
    const isScrollable = elementCouldBeScrolled(axis, current);
    if (isScrollable) {
      const [, s, d] = getScrollVariables(axis, current);
      if (s > d) {
        return true;
      }
    }
    current = current.parentNode as any;
  } while (current && current !== document.body);

  return false;
};

const getVScrollVariables = ({
  scrollTop,
  scrollHeight,
  clientHeight
}: HTMLElement) => [scrollTop, scrollHeight, clientHeight];
const getHScrollVariables = ({
  scrollLeft,
  scrollWidth,
  clientWidth
}: HTMLElement) => [scrollLeft, scrollWidth, clientWidth];

const elementCouldBeScrolled = (axis: Axis, node: HTMLElement): boolean =>
  axis === 'v' ? elementCouldBeVScrolled(node) : elementCouldBeHScrolled(node);

const getScrollVariables = (axis: Axis, node: HTMLElement) =>
  axis === 'v' ? getVScrollVariables(node) : getHScrollVariables(node);

export const handleScroll = (
  axis: Axis,
  endTarget: HTMLElement,
  event: any,
  sourceDelta: number
) => {
  const delta = sourceDelta;
  // find scrollable target
  let target: HTMLElement = event.target as any;
  const targetInLock = endTarget.contains(target);

  let shouldCancelScroll = false;
  const isDeltaPositive = delta > 0;

  let availableScroll = 0;
  let availableScrollTop = 0;

  do {
    const [position, scroll, capacity] = getScrollVariables(axis, target);

    const elementScroll = scroll - capacity - position;
    if (position || elementScroll) {
      if (elementCouldBeScrolled(axis, target)) {
        availableScroll += elementScroll;
        availableScrollTop += position;
      }
    }

    target = target.parentNode as any;
  } while (
    // portaled content
    (!targetInLock && target !== document.body) ||
    // self content
    (targetInLock && (endTarget.contains(target) || endTarget === target))
  );

  if (isDeltaPositive && delta > availableScroll) {
    shouldCancelScroll = true;
  } else if (!isDeltaPositive && -delta > availableScrollTop) {
    shouldCancelScroll = true;
  }

  return shouldCancelScroll;
};
