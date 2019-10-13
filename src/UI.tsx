import * as React from 'react';
import { SideCarComponent } from 'use-sidecar';
import {
  fullWidthClassName,
  zeroRightClassName
} from 'react-remove-scroll-bar/constants';
import {
  IRemoveScrollEffectProps,
  RemoveScrollEffectCallbacks,
  IRemoveScrollUIProps
} from './types';
import { effectCar } from './medium';

const nothing = () => {
  return;
};

function RemoveScroll(props: IRemoveScrollUIProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  const [callbacks, setCallbacks] = React.useState<RemoveScrollEffectCallbacks>(
    {
      onScrollCapture: nothing,
      onWheelCapture: nothing,
      onTouchMoveCapture: nothing
    }
  );

  const {
    forwardProps,
    children,
    className,
    removeScrollBar,
    enabled,
    shards,
    sideCar,
    noIsolation,
    inert
  } = props;

  const SideCar: SideCarComponent<IRemoveScrollEffectProps> = sideCar;

  const containerProps = {
    ref,
    ...callbacks
  };
  return (
    <React.Fragment>
      {enabled && (
        <SideCar
          sideCar={effectCar}
          removeScrollBar={removeScrollBar}
          shards={shards}
          noIsolation={noIsolation}
          inert={inert}
          setCallbacks={setCallbacks}
          lockRef={ref}
        />
      )}
      {forwardProps ? (
        React.cloneElement(
          React.Children.only(children as React.ReactElement),
          containerProps
        )
      ) : (
        <div {...containerProps} className={className}>
          {children}
        </div>
      )}
    </React.Fragment>
  );
}

RemoveScroll.defaultProps = {
  enabled: true,
  removeScrollBar: true,
  inert: false
};

namespace RemoveScroll {
  export let classNames = {
    fullWidth: fullWidthClassName,
    zeroRight: zeroRightClassName
  };
}

export { RemoveScroll };
