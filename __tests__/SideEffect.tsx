import { TouchEvent } from 'react';

import { getTouchXY } from '../src/SideEffect';

describe('getTouchXY', () => {
  it('handles an empty touch list', () => {
    const event = { changedTouches: [] } as unknown as TouchEvent;

    expect(getTouchXY(event)).toEqual([0, 0]);
  });

  it('returns the coordinates of the first changed touch', () => {
    const event = {
      changedTouches: [{ clientX: 12, clientY: 34 }, { clientX: 56, clientY: 78 }],
    } as unknown as TouchEvent;

    expect(getTouchXY(event)).toEqual([12, 34]);
  });

  it('returns the default coordinates for wheel events', () => {
    const event = { deltaX: 12, deltaY: 34 } as WheelEvent;

    expect(getTouchXY(event)).toEqual([0, 0]);
  });
});
