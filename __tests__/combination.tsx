import * as React from 'react';
import {configure, mount} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import {RemoveScroll} from '../src';

configure({ adapter: new Adapter() });

const tick = () => new Promise(resolve => setTimeout(resolve, 10));

describe('Endpoint UI', () => {
  it('smoke', async () => {
    const wrapper = mount(<RemoveScroll>content</RemoveScroll>);
    await tick();
    expect(wrapper.html()).toContain('content');
    console.log(document.body.className);
  });

  it('forward', async () => {
    const wrapper = mount(<RemoveScroll forwardProps><div>content</div></RemoveScroll>);
    await tick();
    expect(wrapper.html()).toContain('content');
    console.log(document.body.className);
  });
});
