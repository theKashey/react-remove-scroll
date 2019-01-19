react-remove-scroll
====
Disables scroll outside of `children` node.

- 🖱 mouse and touch devices friendly
- 📜 removes document scroll bar maintaining it space
- ✅ support nested scrollable elements
- 🕳 supports react-portals (uses React Event system)

# Usage
Just wrap content, which should be scrollable, and everything else would not. 
```js
import {RemoveScroll} from 'react-remove-scroll-bar';

<RemoveScroll>
  Only this content would be scrollable
</RemoveScroll>  
```

`RemoveScroll` accept following props
- `children`
- `[noIsolation]` - disables outer event capturing
- `[forwardProps]` - will forward all props to the `children`
- `[className]` - className for an internal div

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

## More than one lock
This library will silence any scroll(wheel, touch) event outside of whitelisted node. To be able to use more than one lock:
- disable isolation mode `<RemoveScroll noIsolation />`. Then remove scroll would handle only events, happened inside it.
To use this mode you have to _cast_ some _shadow_ behind a modal, to redirect all events to your element
- use [react-scroll-locky](https://github.com/theKashey/react-scroll-locky), or [react-focus-on](https://github.com/theKashey/react-focus-on), but they are lager. 

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

# License
MIT