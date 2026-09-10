import { handleScroll } from '../src/handleScroll';

describe('handleScroll', () => {
  const event = () => ({ target: document.createElement('div') });

  it('does not throw when endTarget is null (lock unmounted mid-teardown)', () => {
    expect(handleScroll('v', null as any, event(), 10, true)).toBe(true);
  });

  it('does not throw when endTarget is an Element', () => {
    const endTarget = document.createElement('div');
    const target = document.createElement('div');

    endTarget.appendChild(target);
    document.body.appendChild(endTarget);

    expect(() => handleScroll('v', endTarget, { target }, 10, true)).not.toThrow();
  });
});
