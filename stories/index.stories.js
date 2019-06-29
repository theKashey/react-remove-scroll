import React from 'react';
import {HScroll, VScroll, HVScroll, HVScrollBlocked} from './Lock';
import {storiesOf} from '@storybook/react';
import {PortalBox} from "./Portals";

storiesOf('Lock', module)
  .add('Vertical', () => <VScroll/>)
  .add('Horizontal', () => <HScroll/>)
  .add('VH', () => <HVScroll/>)
  .add('VH - blocked', () => <HVScrollBlocked/>)
  .add('portals/shards', () => <PortalBox/>)
  .add('portals/shards - blocked', () => <PortalBox options={{inert: true}}/>)

;

