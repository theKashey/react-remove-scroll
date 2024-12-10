import * as React from 'react';
import { fullWidthClassName, zeroRightClassName } from 'react-remove-scroll-bar/constants';
import { useMergeRefs } from 'use-callback-ref';
import { SideCarComponent } from 'use-sidecar';

import { effectCar } from './medium';
import {
  IRemoveScrollEffectProps,
  RemoveScrollEffectCallbacks,
  RemoveScrollUIType,
  IRemoveScrollSelfProps,
} from './types';

export type { IRemoveScrollSelfProps, RemoveScrollUIType };

const nothing = () => {
  return;
};

/**
 * Removes scrollbar from the page and contain the scroll within the Lock
 */
const RemoveScroll: RemoveScrollUIType = ({ ref: parentRef, ...props }) => {
  const ref = React.useRef<HTMLElement>(null);

  const [callbacks, setCallbacks] = React.useState<RemoveScrollEffectCallbacks>({
    onScrollCapture: nothing,
    onWheelCapture: nothing,
    onTouchMoveCapture: nothing,
  });

  const {
    forwardProps,
    children,
    className,
    removeScrollBar = true,
    enabled = true,
    shards,
    sideCar,
    noIsolation,
    inert = false,
    allowPinchZoom,
    as: Container = 'div',
    gapMode,
    ...rest
  } = props;

  const SideCar: SideCarComponent<IRemoveScrollEffectProps> = sideCar;

  const containerRef = useMergeRefs<any>([ref, parentRef as React.RefObject<HTMLElement>]);

  const containerProps = {
    ...rest,
    ...callbacks,
    ref: containerRef,
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
          gapMode={gapMode}
        />
      )}
      {forwardProps ? (
        React.cloneElement(React.Children.only(children as React.ReactElement), containerProps)
      ) : (
        <Container {...containerProps} className={className}>
          {children}
        </Container>
      )}
    </React.Fragment>
  );
};

RemoveScroll.classNames = {
  fullWidth: fullWidthClassName,
  zeroRight: zeroRightClassName,
};

export { RemoveScroll };
