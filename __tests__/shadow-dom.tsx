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

const eventInit = { bubbles: true, composed: true, cancelable: true };

const wheel = (target: Element) => {
  const event = new WheelEvent('wheel', { ...eventInit, deltaY: 50 });
  target.dispatchEvent(event);

  return event.defaultPrevented;
};

// jsdom has no Touch constructor, so touch lists are defined on plain events.
const touchEvent = (type: string, clientY: number) => {
  const event = new Event(type, eventInit);
  const touches = [{ clientX: 0, clientY }];
  Object.defineProperty(event, 'touches', { value: touches });
  Object.defineProperty(event, 'changedTouches', { value: touches });

  return event;
};

const touch = (target: Element) => {
  target.dispatchEvent(touchEvent('touchstart', 100));

  const event = touchEvent('touchmove', 50);
  target.dispatchEvent(event);

  return event.defaultPrevented;
};

describe.each([
  ['wheel', wheel],
  ['touch', touch],
])('shadow DOM (%s)', (_name, scroll) => {
  let root: HTMLElement;

  beforeEach(() => {
    root = document.createElement('div');
    document.body.appendChild(root);
  });

  afterEach(() => {
    unmountComponentAtNode(root);
    document.body.innerHTML = '';
  });

  it('allows scrolling inside a shard that lives in a shadow root', async () => {
    const shardHost = document.createElement('div');
    document.body.appendChild(shardHost);

    const shard = document.createElement('div');
    shardHost.attachShadow({ mode: 'open' }).appendChild(shard);

    const { scroller, content } = makeScroller();
    shard.appendChild(scroller);

    render(<RemoveScroll shards={[shard]}>lock</RemoveScroll>, root);
    await tick();

    expect(scroll(content)).toBe(false);
  });

  it('still blocks non-scrollable content inside a shard in a shadow root', async () => {
    const shardHost = document.createElement('div');
    document.body.appendChild(shardHost);

    const shard = document.createElement('div');
    shardHost.attachShadow({ mode: 'open' }).appendChild(shard);

    render(<RemoveScroll shards={[shard]}>lock</RemoveScroll>, root);
    await tick();

    expect(scroll(shard)).toBe(true);
  });

  it('allows scrolling in a shadow root nested inside a shard', async () => {
    const shard = document.createElement('div');
    const host = document.createElement('div');
    shard.appendChild(host);
    document.body.appendChild(shard);

    const content = attachShadowScroller(host);

    render(<RemoveScroll shards={[shard]}>lock</RemoveScroll>, root);
    await tick();

    expect(scroll(content)).toBe(false);
  });

  it('allows scrolling in a light DOM scroller slotted into a shard', async () => {
    const shardHost = document.createElement('div');
    document.body.appendChild(shardHost);

    const shard = document.createElement('div');
    shard.appendChild(document.createElement('slot'));
    shardHost.attachShadow({ mode: 'open' }).appendChild(shard);

    const { scroller, content } = makeScroller();
    shardHost.appendChild(scroller);

    render(<RemoveScroll shards={[shard]}>lock</RemoveScroll>, root);
    await tick();

    expect(scroll(content)).toBe(false);
  });

  it('allows scrolling in a shadow root nested inside the lock', async () => {
    const hostRef = React.createRef<HTMLDivElement>();

    render(
      <RemoveScroll>
        <div ref={hostRef} />
      </RemoveScroll>,
      root
    );

    await tick();

    const content = attachShadowScroller(hostRef.current!);

    expect(scroll(content)).toBe(false);
  });

  it('still blocks non-scrollable content inside a shadow root nested in the lock', async () => {
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

    expect(scroll(content)).toBe(true);
  });
});
