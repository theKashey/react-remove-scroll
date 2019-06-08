import * as React from "react";
import {RefObject} from "react";

export interface RemoveScrollEffectCallbacks {
  onScrollCapture(event: any): void;

  onWheelCapture(event: any): void;

  onTouchMoveCapture(event: any): void;
}

export interface IRemoveScrollProps {
  noIsolation?: boolean;
  forwardProps?: boolean;
  enabled?: boolean;
  className?: string;
  removeScrollBar?: boolean;

  shards?: Array<React.RefObject<any> | HTMLElement>;
}

export interface IRemoveScrollUIProps extends IRemoveScrollProps{
  sideCar: any;
  children?: React.ReactNode;
}

export interface IRemoveScrollEffectProps {
  noIsolation?: boolean;
  removeScrollBar?: boolean;

  shards?: Array<React.RefObject<any> | HTMLElement>;

  lockRef: RefObject<HTMLElement>;

  setCallbacks(cb: RemoveScrollEffectCallbacks): void;
}