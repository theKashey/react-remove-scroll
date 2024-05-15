// @deno-types="npm:@types/react@^18.2"
import * as React from 'react';

import { RemoveScroll } from './UI.tsx';
import SideCar from './sidecar.tsx';
import { IRemoveScrollProps, RemoveScrollType } from './types.tsx';

const ReactRemoveScroll: RemoveScrollType = React.forwardRef<HTMLElement, IRemoveScrollProps>((props, ref) => (
  <RemoveScroll {...props} ref={ref} sideCar={SideCar} />
)) as any;

ReactRemoveScroll.classNames = RemoveScroll.classNames;

export default ReactRemoveScroll;
