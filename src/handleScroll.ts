  const elementCouldBeScrolled = (node: HTMLElement): boolean => {
  const styles = window.getComputedStyle(node);
  return (
    styles.overflowY !== 'hidden' && // not-not-scrollable
    !(styles.overflowY === styles.overflowX && styles.overflowY === 'visible') // scrollable
  );
};

export const handleScroll = (endTarget: HTMLElement, event: any, sourceDelta: number) => {
  const delta = sourceDelta;
  // find scrollable target
  let target: HTMLElement = event.target as any;
  const targetInLock = endTarget.contains(target);

  let shouldCancelScroll = false;
  const isDeltaPositive = delta > 0;

  let availableScroll = 0;
  let availableScrollTop = 0;

  do {
    const {scrollTop, scrollHeight, clientHeight} = target;

    const elementScroll = scrollHeight - clientHeight - scrollTop;
    if (scrollTop || elementScroll) {
      if (elementCouldBeScrolled(target)) {
        availableScroll += elementScroll;
        availableScrollTop += scrollTop;
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