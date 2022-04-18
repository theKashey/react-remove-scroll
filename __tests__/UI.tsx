import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';

import { sidecar } from 'use-sidecar';

import { RemoveScroll } from '../src/UI';

configure({ adapter: new Adapter() });

const tick = () => new Promise((resolve) => setTimeout(resolve, 10));

const car = sidecar(() => import('../src/sidecar'));

describe('UI', () => {
  it('smoke', async () => {
    const wrapper = mount(<RemoveScroll sideCar={car}>content</RemoveScroll>);
    await tick();
    expect(wrapper.html()).toBe('<div>content</div>');
  });

  it('smoke as style class', async () => {
    const wrapper = mount(
      <RemoveScroll sideCar={car} as="span" style={{ width: 'auto' }} className="name">
        content
      </RemoveScroll>
    );
    await tick();
    expect(wrapper.html()).toBe('<span style="width: auto;" class="name">content</span>');
  });

  it('forward', async () => {
    const wrapper = mount(
      <RemoveScroll sideCar={car} forwardProps>
        <span>content</span>
      </RemoveScroll>
    );
    await tick();
    expect(wrapper.html()).toBe('<span>content</span>');
  });
});
