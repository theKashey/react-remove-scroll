import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { RemoveScroll } from '../src';

function LongList() {
  return (
    <div style={{ backgroundColor: 'white' }}>
      <RemoveScroll>
        <div style={{ overflow: 'auto', height: '100vh' }}>
          {new Array(100).fill(0).map((_, idx) => (
            <div key={idx}>Inside {idx}</div>
          ))}
        </div>
      </RemoveScroll>

      {new Array(100).fill(0).map((_, idx) => (
        <div key={idx}>Outside {idx}</div>
      ))}
    </div>
  );
}

export function ScrollInShadowDom() {
  const [portal, setPortal] = React.useState<any>(null);
  const setRef = React.useCallback((ref) => {
    if (ref) {
      const shadowRoot = ref.attachShadow({ mode: 'open' });
      setPortal(ReactDOM.createPortal(<LongList />, shadowRoot));
    }
  }, []);

  return (
    <div style={{ height: 300, overflow: 'scroll', padding: 50, backgroundColor: 'yellow' }}>
      <div ref={setRef} />
      {portal}
    </div>
  );
}

export default {
  title: 'shadow dom',
};
