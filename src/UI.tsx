import * as React from 'react';
import { fullWidthClassName, zeroRightClassName } from 'react-remove-scroll-bar/constants';
import { useMergeRefs } from 'use-callback-ref';
import { SideCarComponent } from 'use-sidecar';

import { effectCar } from './medium';
import {
  IRemoveScrollEffectProps,
  RemoveScrollEffectCallbacks,
  IRemoveScrollUIProps,
  RemoveScrollUIType,
} from './types';

const nothing = () => {
  return;
};

/**
 * Removes scrollbar from the page and contain the scroll within the Lock
 */
const RemoveScroll: RemoveScrollUIType = React.forwardRef<HTMLElement, IRemoveScrollUIProps>((props, parentRef) => {
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
    removeScrollBar,
    enabled,
    shards,
    sideCar,
    noIsolation,
    inert,
    allowPinchZoom,
    as: Container = 'div',
    ...rest
  } = props;

  const SideCar: SideCarComponent<IRemoveScrollEffectProps> = sideCar;

  const containerRef = useMergeRefs<any>([ref, parentRef as React.MutableRefObject<HTMLElement>]);

  const containerProps = {
    ...rest,
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
          inert={inert}
          setCallbacks={setCallbacks}
          allowPinchZoom={!!allowPinchZoom}
          lockRef={ref}
        />
      )}
      {forwardProps ? (
        React.cloneElement(React.Children.only(children as React.ReactElement), {
          ...containerProps,
          ref: containerRef,
        })
      ) : (
        <Container {...containerProps} className={className} ref={containerRef}>
          {children}
        </Container>
      )}
    </React.Fragment>
  );
}) as any;

RemoveScroll.defaultProps = {
  enabled: true,
  removeScrollBar: true,
  inert: false,
};

RemoveScroll.classNames = {
  fullWidth: fullWidthClassName,
  zeroRight: zeroRightClassName,
};

export { RemoveScroll };
