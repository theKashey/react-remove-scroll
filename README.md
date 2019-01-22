react-remove-scroll
====
[![NPM version](https://img.shields.io/npm/v/react-remove-scroll.svg)](https://www.npmjs.com/package/react-remove-scroll)

Disables scroll outside of `children` node.

- 🖱 mouse and touch devices friendly
- 📜 removes document scroll bar maintaining it space
- ✅ support nested scrollable elements
- 🕳 supports react-portals (uses React Event system)

# Usage
Just wrap content, which should be scrollable, and everything else would not. 
```js
import {RemoveScroll} from 'react-remove-scroll';

<RemoveScroll>
  Only this content would be scrollable
</RemoveScroll>  
```

`RemoveScroll` accept following props
- `children`
- `[enabled]` - activate or deactivate component behaviour without removing it.
- `[noIsolation]` - disables outer event capturing
- `[forwardProps]` - will forward all props to the `children`
- `[className]` - className for an internal div
- `[removeScrollBar]` - to control scroll bar removal. Set to false, if you prefer to keep it (wheel and touch scroll still disabled).

## Internal div
But default RemoveScroll will create a div to handle and capture events.
You may specify `className` for it, if you need, or __remove it__.

The following code samples will produce the same output
```js
<RemoveScroll className="scroll">
  Only this content would be scrollable
</RemoveScroll>
```

```js
<RemoveScroll forwardProps>
  <div className="scroll"> //RemoveScroll will inject props to this div
    Only this content would be scrollable
  </div>
</RemoveScroll> 
```
Pick the first one if you don't need a second.

## Position:fixed elements
To properly size these elements please add a special className to them.
```jsx
import {RemoveScroll} from 'react-remove-scroll';

// to make "width: 100%"
<div className={cx(classWithPositionFixed, RemoveScroll.classNames.fullWidth)} />

// to make "right:0"
<div className={cx(classWithPositionFixed, RemoveScroll.classNames.zeroRight)} />
```
See [react-remove-scroll-bar](https://github.com/theKashey/react-remove-scroll-bar) documentation for details.

## More than one lock
When stacked more is active (default) only one (last) component would be active.

# Performance
To do the job this library setup _non_ passive event listener. Chrome dev tools would complain about it, as a 
performance no-op.

We have to use synchronous scroll/touch handler, and it may affect scrolling performance.

Consider using `noIsolation` mode, if you have large scrollable areas.

# Size
1.5kb after compression (excluding tslib).

# Scroll-Locky
This is a refactoring of another library - [react-scroll-locky](https://github.com/theKashey/react-scroll-locky) -
to make package smaller and more react-portals friendly.

## See also
 - [react-focus-on](https://github.com/theKashey/react-focus-on) - Finite Modal creator (uses Scroll-Locky) underneath.
 - [react-locky](https://github.com/theKashey/react-locky) - React event canceler
 - [react-scrolllock](https://github.com/jossmac/react-scrolllock) - React scroll lock
 - [scroll-lock](https://github.com/FL3NKEY/scroll-lock) - DOM scroll lock
 - [body-scroll-lock](https://github.com/willmcpo/body-scroll-lock) - DOM scroll lock
 
 > This package is relative smaller(1), more react friendly(2), works with non zero body margins(3), and has a better "overscroll" management. 

# License
MIT