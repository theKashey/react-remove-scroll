import * as React from 'react';
import {SideCarComponent} from 'use-sidecar';
import {fullWidthClassName, zeroRightClassName} from 'react-remove-scroll-bar/constants';
import {IRemoveScrollEffectProps, RemoveScrollEffectCallbacks, IRemoveScrollUIProps} from "./types";
import {effectCar} from "./medium";

function RemoveScroll(props: IRemoveScrollUIProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  const [callbacks, setCallbacks] = React.useState<RemoveScrollEffectCallbacks>({} as any);

  const {forwardProps, children, className, removeScrollBar, enabled, shards, sideCar, noIsolation} = props;

  const SideCar: SideCarComponent<IRemoveScrollEffectProps> = sideCar;

  const containerProps = {
    ref,
    ...callbacks,
  };
  return (
    <React.Fragment>
      {enabled && (
        <SideCar
          sideCar={effectCar}

          removeScrollBar={removeScrollBar}

          shards={shards}
          noIsolation={noIsolation}

          setCallbacks={setCallbacks}
          lockRef={ref}
        />
      )}
      {forwardProps
        ? React.cloneElement(React.Children.only(children), containerProps)
        : <div {...containerProps} className={className}>{children}</div>
      }
    </React.Fragment>
  )
}

RemoveScroll.defaultProps = {
  enabled: true,
  removeScrollBar: true,
};

namespace RemoveScroll {
  export let classNames = {
    fullWidth: fullWidthClassName,
    zeroRight: zeroRightClassName,
  };
}

export {
  RemoveScroll,
}