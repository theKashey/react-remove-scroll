import * as React from 'react';
import { RefObject } from 'react';
import { ForwardRefExoticComponent } from 'react';
import { RefAttributes } from 'react';

export type Axis = 'v' | 'h';

export interface RemoveScrollEffectCallbacks {
  onScrollCapture(event: any): void;

  onWheelCapture(event: any): void;

  onTouchMoveCapture(event: any): void;
}

export interface ChildrenNode {
  forwardProps?: false;
  children: React.ReactNode;
}

export interface ChildrenForward {
  forwardProps: true;
  children: React.ReactElement;
}

export interface IRemoveScrollSelfProps {
  noIsolation?: boolean;
  inert?: boolean;
  allowPinchZoom?: boolean;

  enabled?: boolean;
  className?: string;
  removeScrollBar?: boolean;

  shards?: Array<React.RefObject<any> | HTMLElement>;
}

export type IRemoveScrollProps = IRemoveScrollSelfProps &
  (ChildrenForward | ChildrenNode);

export type IRemoveScrollUIProps = IRemoveScrollProps & {
  sideCar: React.FC<any>;
};

export interface IRemoveScrollEffectProps {
  noIsolation?: boolean;
  removeScrollBar?: boolean;
  allowPinchZoom: boolean;
  inert?: boolean;

  shards?: Array<React.RefObject<any> | HTMLElement>;

  lockRef: RefObject<HTMLElement>;

  setCallbacks(cb: RemoveScrollEffectCallbacks): void;
}

interface WithClassNames {
  classNames: {
    fullWidth: string;
    zeroRight: string;
  };
}

type RefForwarded<T> = ForwardRefExoticComponent<
  T & RefAttributes<HTMLElement>
> &
  WithClassNames;

export type RemoveScrollType = RefForwarded<IRemoveScrollProps>;

export type RemoveScrollUIType = RefForwarded<IRemoveScrollUIProps>;
