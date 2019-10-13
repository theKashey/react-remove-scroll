import * as React from 'react';
import { RemoveScroll } from './UI';
import { IRemoveScrollProps } from './types';
import SideCar from './sidecar';

function ReactRemoveScroll(props: IRemoveScrollProps) {
  return <RemoveScroll {...props} sideCar={SideCar} />;
}

namespace ReactRemoveScroll {
  export let classNames = RemoveScroll.classNames;
}

export default ReactRemoveScroll;
