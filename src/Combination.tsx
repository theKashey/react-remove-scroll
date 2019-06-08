import * as React from 'react';
import {RemoveScroll} from "./UI";
import {IRemoveScrollProps} from './types';
import {RemoveScrollSideCar} from './SideEffect';

function ReactRemoveScroll(props: IRemoveScrollProps) {
  return (
    <RemoveScroll
      {...props}
      sideCar={RemoveScrollSideCar}
    />
  );
}

namespace ReactRemoveScroll {
  export let classNames = RemoveScroll.classNames;
}

export default ReactRemoveScroll;