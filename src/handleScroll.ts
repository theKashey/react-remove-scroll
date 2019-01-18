export const handleScroll = (endTarget: HTMLElement, event: any, sourceDelta: number) => {
  const delta = sourceDelta;
  // find scrollable target
  let target: HTMLElement = event.target as any;

  let shouldCancelScroll = false;
  const isDeltaPositive = delta > 0;

  let availableScroll = 0;
  let availableScrollTop = 0;

  do {
    const {scrollTop, scrollHeight, clientHeight} = target;

    availableScroll += scrollHeight - clientHeight - scrollTop;
    availableScrollTop += scrollTop;

    target = target.parentNode as any;
  } while (target !== document.body || endTarget.contains(target));

  if (isDeltaPositive && delta > availableScroll) {
    shouldCancelScroll = true;
  } else if (!isDeltaPositive && -delta > availableScrollTop) {
    shouldCancelScroll = true;
  }

  return shouldCancelScroll;
};