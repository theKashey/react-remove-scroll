import * as React from 'react';
import {RemoveScroll} from "./UI";
import {IRemoveScrollProps, RemoveScrollType} from './types';
import SideCar from './sidecar';

const ReactRemoveScroll: RemoveScrollType = React.forwardRef<HTMLElement, IRemoveScrollProps>((props, ref) => (
  <RemoveScroll
    {...props}
    ref={ref}
    sideCar={SideCar}
  />
)) as any;

ReactRemoveScroll.classNames = RemoveScroll.classNames;


export default ReactRemoveScroll;