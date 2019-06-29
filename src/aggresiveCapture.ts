let passiveSupported = false;

if(typeof window !== 'undefined') {
  try {
    const options = Object.defineProperty({}, 'passive', {
      get() {
        passiveSupported = true;
        return true;
      },
    });

    window.addEventListener('test', options, options);
    window.removeEventListener('test', options, options);
  } catch (err) {
    passiveSupported = false;
  }
}
export const nonPassive = passiveSupported ? { passive: false } : false;
