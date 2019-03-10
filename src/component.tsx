import * as React from 'react';
import {TouchEvent} from "react";
import {RemoveScrollBar, fullWidthClassName, zeroRightClassName} from 'react-remove-scroll-bar';
import {handleScroll} from "./handleScroll";
import {aggressive} from './aggresiveCapture';

export const getTouchY = (event: TouchEvent) => event.changedTouches ? event.changedTouches[0].clientY : 0;

export interface IRemoveScrollProps {
  noIsolation?: boolean;
  forwardProps?: boolean;
  enabled?: boolean;
  className?: string;
  removeScrollBar?: boolean;

  shards?: Array<React.RefObject<any>>;
}

const classNames = {
  fullWidth: fullWidthClassName,
  zeroRight: zeroRightClassName,
};

export class RemoveScroll extends React.Component<IRemoveScrollProps> {
  public static classNames = classNames;

  public static defaultProps = {
    enabled: true,
    removeScrollBar: true,
  };

  private static stack: RemoveScroll[] = [];

  private shouldPreventQueue: Array<{ name: string, delta: number, target: any, should: boolean }> = [];
  private touchStart = 0;
  private ref = React.createRef<HTMLDivElement>();

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
      document.addEventListener('touchstart', this.scrollTouchStart, aggressive);
    }
  }

  disable() {
    if (typeof window !== 'undefined') {
      document.removeEventListener('wheel', this.shouldPrevent, aggressive as any);
      document.removeEventListener('touchmove', this.shouldPrevent, aggressive as any);
      document.removeEventListener('touchstart', this.scrollTouchStart, aggressive as any);
    }
  }

  shouldCancelEvent(event: any, parent: HTMLElement) {
    switch (event.type) {
      case 'wheel':
      case 'scroll':
        return handleScroll(parent, event, event.deltaY)
      case 'touchmove':
        return handleScroll(parent, event, this.touchStart - getTouchY(event));
    }
    return false;
  };

  shouldPrevent = (event: any) => {
    const stack = RemoveScroll.stack.filter(el => el.props.enabled);
    if (!stack.length || stack[stack.length - 1] !== this) {
      // not current active
      return;
    }
    const delta = event.deltaY || getTouchY(event);
    const sourceEvent = this.shouldPreventQueue.filter(
      (e: any) => e.name === event.type && e.delta === delta && e.target === event.target
    )[0];
    // self event, and should be canceled
    if (sourceEvent && sourceEvent.should) {
      event.preventDefault();
      return;
    }
    // outside or shard event
    if (!sourceEvent) {
      const shardNodes = (this.props.shards || [])
        .map(({current}) => current)
        .filter(Boolean)
        .filter(node => node.contains(event.target));

      const shouldStop = shardNodes.length > 0
        ? this.shouldCancelEvent(event, shardNodes[0])
        : !this.props.noIsolation

      if (shouldStop) {
        event.preventDefault();
      }
    }
  };

  shouldCancel = (name: string, delta: number, target: any, should: boolean) => {
    const event = {name, delta, target, should};
    this.shouldPreventQueue.push(event);
    setTimeout(() => {
      this.shouldPreventQueue = this.shouldPreventQueue.filter(e => e !== event);
    }, 1);
  };

  scrollTouchStart = (event: any) => {
    this.touchStart = getTouchY(event);
  };

  scrollWheel = (event: any) => {
    this.shouldCancel(event.type, event.deltaY, event.target, this.shouldCancelEvent(event, this.ref.current as any));
  };

  scrollTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    this.shouldCancel(event.type, getTouchY(event), event.target, this.shouldCancelEvent(event, this.ref.current as any));
  };

  render() {
    const {forwardProps, children, className, removeScrollBar, enabled} = this.props;

    const props = {
      ref: this.ref,
      onScrollCapture: this.scrollWheel,
      onWheelCapture: this.scrollWheel,
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