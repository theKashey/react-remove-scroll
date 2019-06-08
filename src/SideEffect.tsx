import * as React from 'react';
import {TouchEvent} from "react";
import {RemoveScrollBar} from 'react-remove-scroll-bar';
import {handleScroll} from "./handleScroll";
import {aggressive} from './aggresiveCapture';
import {IRemoveScrollEffectProps} from "./types";

export const getTouchY = (event: TouchEvent) => event.changedTouches ? event.changedTouches[0].clientY : 0;

const extractRef = (ref: React.RefObject<any> | HTMLElement): HTMLElement => (
  (ref && 'current' in ref) ? ref.current : ref
);

export class RemoveScrollSideCar extends React.Component<IRemoveScrollEffectProps> {
  private static stack: RemoveScrollSideCar[] = [];

  private shouldPreventQueue: Array<{ name: string, delta: number, target: any, should: boolean }> = [];
  private touchStart = 0;

  componentDidMount() {
    RemoveScrollSideCar.stack.push(this);
    this.props.setCallbacks({
      onScrollCapture: this.scrollWheel,
      onWheelCapture: this.scrollWheel,
      onTouchMoveCapture: this.scrollTouchMove,
    });
  }

  componentWillUnmount() {
    RemoveScrollSideCar.stack = RemoveScrollSideCar.stack.filter(inst => inst !== this);
    this.disable();
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
        return handleScroll(parent, event, event.deltaY);
      case 'touchmove':
        return handleScroll(parent, event, this.touchStart - getTouchY(event));
    }
    return false;
  };

  shouldPrevent = (event: any) => {
    const stack = RemoveScrollSideCar.stack;
    if (!stack.length || stack[stack.length - 1] !== this) {
      // not the last active
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
    this.shouldCancel(event.type, event.deltaY, event.target, this.shouldCancelEvent(event, this.props.lockRef.current as any));
  };

  scrollTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    this.shouldCancel(event.type, getTouchY(event), event.target, this.shouldCancelEvent(event, this.props.lockRef.current as any));
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