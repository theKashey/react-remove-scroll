import * as React from 'react';
import {TouchEvent} from "react";
import {RemoveScrollBar, fullWidthClassName, zeroRightClassName} from 'react-remove-scroll-bar';
import {handleScroll} from "./handleScroll";
import {aggressive} from './aggresiveCapture';

export const getTouchY = (event: TouchEvent) => event.changedTouches ? event.changedTouches[0].clientY : 0;

export interface RemoveScrollProps {
  noIsolation?: boolean;
  forwardProps?: boolean;
  enabled?: boolean;
  className?: string;
  removeScrollBar?: boolean;
}

const classNames = {
  fullWidth: fullWidthClassName,
  zeroRight: zeroRightClassName,
};

export class RemoveScroll extends React.Component<RemoveScrollProps> {
  private shouldPreventQueue: Array<{ name: string, delta: number, target: any, should: boolean }> = [];
  private touchStart = 0;
  private ref = React.createRef<HTMLDivElement>();

  public static classNames = classNames;
  public static stack: Array<RemoveScroll> = [];

  static defaultProps = {
    enabled: true,
    removeScrollBar: true,
  };

  componentDidMount() {
    RemoveScroll.stack.push(this);
    this.componentDidUpdate({enabled: false})
  }

  componentWillUnmount() {
    RemoveScroll.stack = RemoveScroll.stack.filter(inst => inst !== this);
    this.disable()
  }

  componentDidUpdate(oldProps: RemoveScrollProps) {
    if (oldProps.enabled !== this.props.enabled) {
      if (this.props.enabled) {
        this.enable();
      } else {
        this.disable();
      }
    }
  }

  enable() {
    if (typeof document !== 'undefined') {
      document.addEventListener('wheel', this.shouldPrevent, aggressive);
      document.addEventListener('touchmove', this.shouldPrevent, aggressive);
    }
  }

  disable() {
    if (typeof window !== 'undefined') {
      document.removeEventListener('wheel', this.shouldPrevent, aggressive as any);
      document.removeEventListener('touchmove', this.shouldPrevent, aggressive as any);
    }
  }

  shouldPrevent = (event: any) => {
    if (RemoveScroll.stack[RemoveScroll.stack.length - 1] !== this) {
      // not current active
      return;
    }
    const delta = event.deltaY || getTouchY(event);
    const sourceEvent = this.shouldPreventQueue.filter(
      (e: any) => e.name === event.type && e.delta === delta && e.target === event.target
    )[0];
    if ((!sourceEvent && !this.props.noIsolation) || (sourceEvent && sourceEvent.should)) {
      event.preventDefault();
    }
  };

  shouldCancel = (name: string, delta: number, target: any, should: boolean) => {
    const event = {name, delta, target, should};
    this.shouldPreventQueue.push(event);
    setTimeout(() => {
      this.shouldPreventQueue = this.shouldPreventQueue.filter(e => e !== event);
    }, 1);
  };

  scrollTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    this.touchStart = getTouchY(event);
  };

  scrollWheel = (event: any) => {
    this.shouldCancel(event.type, event.deltaY, event.target, handleScroll(this.ref.current as any, event, event.deltaY));
  };

  scrollTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    this.shouldCancel(event.type, getTouchY(event), event.target, handleScroll(this.ref.current as any, event, this.touchStart - getTouchY(event)));
  };

  render() {
    const {forwardProps, children, className, removeScrollBar, enabled} = this.props;

    const props = {
      ref: this.ref,
      onScrollCapture: this.scrollWheel,
      onWheelCapture: this.scrollWheel,
      onTouchStartCapture: this.scrollTouchStart,
      onTouchMoveCapture: this.scrollTouchMove,
    };
    return (
      <React.Fragment>
        {removeScrollBar && enabled && <RemoveScrollBar gapMode="margin"/>}
        {forwardProps
          ? React.cloneElement(React.Children.only(children), props)
          : <div {...props} className={className}>{children}</div>
        }
      </React.Fragment>
    )
  }
}