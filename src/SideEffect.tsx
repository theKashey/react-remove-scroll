import * as React from 'react';
import {TouchEvent} from "react";
import {RemoveScrollBar} from 'react-remove-scroll-bar';
import {handleScroll, locationCouldBeScrolled} from "./handleScroll";
import {nonPassive} from './aggresiveCapture';
import {Axis, IRemoveScrollEffectProps} from "./types";

export const getTouchXY = (event: TouchEvent) => (
  event.changedTouches
    ? [event.changedTouches[0].clientX, event.changedTouches[0].clientY]
    : [0, 0]
);

export const getDeltaXY = (event: WheelEvent) => (
  [event.deltaX, event.deltaY]
);

const extractRef = (ref: React.RefObject<any> | HTMLElement): HTMLElement => (
  (ref && 'current' in ref) ? ref.current : ref
);

const deltaCompare = (x: number[], y: number[]) => (
  x[0] === y[0] && x[1] === y[1]
);

export class RemoveScrollSideCar extends React.Component<IRemoveScrollEffectProps> {
  private static stack: RemoveScrollSideCar[] = [];

  private shouldPreventQueue: Array<{ name: string, delta: number[], target: any, should: boolean }> = [];
  private touchStart = [0, 0];
  private activeAxis?: Axis = undefined;

  componentDidMount() {
    RemoveScrollSideCar.stack.push(this);
    this.props.setCallbacks({
      onScrollCapture: this.scrollWheel,
      onWheelCapture: this.scrollWheel,
      onTouchMoveCapture: this.scrollTouchMove,
    });
    this.enable();
  }

  componentWillUnmount() {
    RemoveScrollSideCar.stack = RemoveScrollSideCar.stack.filter(inst => inst !== this);
    this.disable();
  }

  enable() {
    if (typeof document !== 'undefined') {
      document.addEventListener('wheel', this.shouldPrevent, nonPassive);
      document.addEventListener('touchmove', this.shouldPrevent, nonPassive);
      document.addEventListener('touchstart', this.scrollTouchStart, nonPassive);
    }
  }

  disable() {
    if (typeof window !== 'undefined') {
      document.removeEventListener('wheel', this.shouldPrevent, nonPassive as any);
      document.removeEventListener('touchmove', this.shouldPrevent, nonPassive as any);
      document.removeEventListener('touchstart', this.scrollTouchStart, nonPassive as any);
    }
  }

  shouldCancelEvent(event: any, parent: HTMLElement) {
    const touch = getTouchXY(event);
    const deltaX = 'deltaX' in event ? event.deltaX : this.touchStart[0] - touch[0];
    const deltaY = 'deltaY' in event ? event.deltaY : this.touchStart[1] - touch[1];

    let currentAxis: Axis | undefined;
    let target: HTMLElement = event.target as any;

    const moveDirection: Axis = Math.abs(deltaX) > Math.abs(deltaY) ? 'h' : 'v';
    const canBeScrolledInMainDirection = locationCouldBeScrolled(moveDirection, target);

    if (canBeScrolledInMainDirection) {
      currentAxis = moveDirection;
    } else {
      currentAxis = moveDirection === 'v' ? 'h' : 'v';
      // other axis might be not scrollable
      if (!locationCouldBeScrolled(currentAxis, target)) {
        currentAxis = undefined;
      }
    }

    // console.log('at', parent);
    // console.log('active axis set to', moveDirection, deltaX, deltaY, this.touchStart, touch);
    // console.log('could be moved?', canBeScrolledInMainDirection);
    // console.log('result', currentAxis, this.activeAxis);

    if (!this.activeAxis && event.changedTouches && (deltaX || deltaY)) {
      this.activeAxis = currentAxis;
    }

    if (!currentAxis) {
      return true
    }

    return handleScroll(this.activeAxis || currentAxis, parent, event, deltaY);
  };

  shouldPrevent = (event: any) => {
    const stack = RemoveScrollSideCar.stack;
    if (!stack.length || stack[stack.length - 1] !== this) {
      // not the last active
      return;
    }
    const delta = event.deltaY ? getDeltaXY(event) : getTouchXY(event);
    const sourceEvent = this.shouldPreventQueue.filter(
      (e) => e.name === event.type && e.target === event.target && deltaCompare(e.delta, delta)
    )[0];
    // self event, and should be canceled
    if (sourceEvent && sourceEvent.should) {
      event.preventDefault();
      return;
    }
    // outside or shard event
    if (!sourceEvent) {
      const shardNodes = (this.props.shards || [])
        .map(extractRef)
        .filter(Boolean)
        .filter(node => node.contains(event.target));

      const shouldStop = shardNodes.length > 0
        ? this.shouldCancelEvent(event, shardNodes[0])
        : !this.props.noIsolation;

      if (shouldStop) {
        event.preventDefault();
      }
    }
  };

  shouldCancel = (name: string, delta: number[], target: any, should: boolean) => {
    const event = {name, delta, target, should};
    this.shouldPreventQueue.push(event);
    setTimeout(() => {
      this.shouldPreventQueue = this.shouldPreventQueue.filter(e => e !== event);
    }, 1);
  };

  scrollTouchStart = (event: any) => {
    this.touchStart = getTouchXY(event);
    this.activeAxis = undefined;
  };

  scrollWheel = (event: WheelEvent) => {
    this.shouldCancel(event.type, getDeltaXY(event), event.target, this.shouldCancelEvent(event, this.props.lockRef.current as any));
  };

  scrollTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    this.shouldCancel(event.type, getTouchXY(event), event.target, this.shouldCancelEvent(event, this.props.lockRef.current as any));
  };

  render() {
    const {removeScrollBar} = this.props;

    return (
      removeScrollBar
        ? <RemoveScrollBar gapMode="margin"/>
        : null
    )
  }
}