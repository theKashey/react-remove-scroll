import * as React from 'react';
import { SideCarComponent } from 'use-sidecar';
import {
  fullWidthClassName,
  zeroRightClassName
} from 'react-remove-scroll-bar/constants';
import {
  IRemoveScrollEffectProps,
  RemoveScrollEffectCallbacks,
  IRemoveScrollUIProps,
  RemoveScrollUIType
} from './types';
import { effectCar } from './medium';
import { useMergeRefs } from 'use-callback-ref';

const nothing = () => {
  return;
};

const RemoveScroll: RemoveScrollUIType = React.forwardRef<
  HTMLElement,
  IRemoveScrollUIProps
>((props, parentRef) => {
  const ref = React.useRef<HTMLElement>(null);

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
    inert,
    allowPinchZoom,
    ...rest
  } = props;

  const SideCar: SideCarComponent<IRemoveScrollEffectProps> = sideCar;

  const containerProps = {
    ref: useMergeRefs<any>([
      ref,
      parentRef as React.MutableRefObject<HTMLElement>
    ]),
    ...rest,
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
          allowPinchZoom={!!allowPinchZoom}
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
}) as any;

RemoveScroll.defaultProps = {
  enabled: true,
  removeScrollBar: true,
  inert: false
};

RemoveScroll.classNames = {
  fullWidth: fullWidthClassName,
  zeroRight: zeroRightClassName
};

export { RemoveScroll };
