import { storiesOf } from '@storybook/react';
import React from 'react';

import { HScroll, RTLHScroll, VScroll, HVScroll, HVScrollBlocked, RangeInput } from './Lock';
import { PortalBox } from './Portals';

// export const Vertical = VScroll;
//
storiesOf('Lock', module)
  .add('Vertical', () => <VScroll />)
  .add('Horizontal', () => <HScroll />)
  .add('RTL - Horizontal', () => <RTLHScroll />)
  .add('VH', () => <HVScroll />)
  .add('VH - blocked', () => <HVScrollBlocked />)
  .add('portals/shards', () => <PortalBox />)
  .add('portals/shards - blocked', () => <PortalBox options={{ inert: true }} />)
  .add('special - range', () => <RangeInput />);

// export default {
//   title:'Lock'
// }
