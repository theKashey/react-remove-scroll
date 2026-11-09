import * as React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import { RemoveScroll } from '../src';

const tick = () => new Promise((resolve) => setTimeout(resolve, 10));

const makeScroller = () => {
  const scroller = document.createElement('div');
  scroller.style.overflowY = 'auto';
  Object.defineProperty(scroller, 'scrollHeight', { value: 1000 });
  Object.defineProperty(scroller, 'clientHeight', { value: 100 });

  const content = document.createElement('div');
  scroller.appendChild(content);

  return { scroller, content };
};

const attachShadowScroller = (host: HTMLElement) => {
  const { scroller, content } = makeScroller();
  host.attachShadow({ mode: 'open' }).appendChild(scroller);

  return content;
};

const wheel = (target: Element) => {
  const event = new WheelEvent('wheel', { deltaY: 50, bubbles: true, composed: true, cancelable: true });
  target.dispatchEvent(event);

  return event.defaultPrevented;
};

describe('shadow DOM', () => {
  let root: HTMLElement;

  beforeEach(() => {
    root = document.createElement('div');
    document.body.appendChild(root);
  });

  afterEach(() => {
    unmountComponentAtNode(root);
    document.body.innerHTML = '';
  });

  it('allows wheel scrolling inside a shard that lives in a shadow root', async () => {
    const shardHost = document.createElement('div');
    document.body.appendChild(shardHost);

    const shard = document.createElement('div');
    shardHost.attachShadow({ mode: 'open' }).appendChild(shard);

    const { scroller, content } = makeScroller();
    shard.appendChild(scroller);

    render(<RemoveScroll shards={[shard]}>lock</RemoveScroll>, root);
    await tick();

    expect(wheel(content)).toBe(false);
  });

  it('still blocks wheel events on non-scrollable content inside a shard in a shadow root', async () => {
    const shardHost = document.createElement('div');
    document.body.appendChild(shardHost);

    const shard = document.createElement('div');
    shardHost.attachShadow({ mode: 'open' }).appendChild(shard);

    render(<RemoveScroll shards={[shard]}>lock</RemoveScroll>, root);
    await tick();

    expect(wheel(shard)).toBe(true);
  });

  it('allows wheel scrolling in a shadow root nested inside a shard', async () => {
    const shard = document.createElement('div');
    const host = document.createElement('div');
    shard.appendChild(host);
    document.body.appendChild(shard);

    const content = attachShadowScroller(host);

    render(<RemoveScroll shards={[shard]}>lock</RemoveScroll>, root);
    await tick();

    expect(wheel(content)).toBe(false);
  });

  it('allows wheel scrolling in a shadow root nested inside the lock', async () => {
    const hostRef = React.createRef<HTMLDivElement>();

    render(
      <RemoveScroll>
        <div ref={hostRef} />
      </RemoveScroll>,
      root
    );

    await tick();

    const content = attachShadowScroller(hostRef.current!);

    expect(wheel(content)).toBe(false);
  });

  it('still blocks wheel events on non-scrollable content inside a shadow root nested in the lock', async () => {
    const hostRef = React.createRef<HTMLDivElement>();

    render(
      <RemoveScroll>
        <div ref={hostRef} />
      </RemoveScroll>,
      root
    );

    await tick();

    const content = document.createElement('div');
    hostRef.current!.attachShadow({ mode: 'open' }).appendChild(content);

    expect(wheel(content)).toBe(true);
  });
});
