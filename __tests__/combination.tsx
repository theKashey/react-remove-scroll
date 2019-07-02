import * as React from 'react';
import {configure, mount} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import {RemoveScroll} from '../src';

configure({ adapter: new Adapter() });

const tick = () => new Promise(resolve => setTimeout(resolve, 10));

describe('Endpoint UI', () => {
  it('smoke', async () => {
    const wrapper = mount(<RemoveScroll>content</RemoveScroll>);
    expect(wrapper.html()).toContain('content');
    await tick();
    expect(wrapper.html()).toContain('content');
    expect(document.body.className).toBe('');
  });

  it('smoke', async () => {
    const wrapper = mount(<RemoveScroll inert>content</RemoveScroll>);
    expect(wrapper.html()).toContain('content');
    await tick();
    expect(wrapper.html()).toContain('content');
    expect(document.body.className).toBe('block-interactivity-2');
    wrapper.unmount();
    expect(document.body.className).toBe('');
  });

  it('forward', async () => {
    const wrapper = mount(<RemoveScroll forwardProps><div>content</div></RemoveScroll>);
    expect(wrapper.html()).toContain('content');
    await tick();
    expect(wrapper.html()).toContain('content');
    expect(document.body.className).toBe('');
  });
});
