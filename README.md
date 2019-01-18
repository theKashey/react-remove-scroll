react-remove-scroll
====
Disables scroll outside of `children` node.

- 🖱 mouse and touch devices friendly
- 📜 removes document scroll bar maintaining the gap
- ✅ support nested scrollable elements
- 🕳 supports react-portals

# Usage
Just wrap content, which should be scrollable, and everything else would not. 
```js
import {RemoveScroll} from 'react-remove-scroll-bar';

<RemoveScroll>
  Only this content would be scrollable
</RemoveScroll>  
```

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

# License
MIT