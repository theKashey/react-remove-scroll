import React from 'react';

import { RemoveScroll } from '../src';

export const PinchZoomNoOverflow = () => (
  <div className="App">
    <RemoveScroll allowPinchZoom style={{ height: '5000px' }}>
      <div
        style={{
          border: '1px solid black',
          padding: '20px',
          height: '300px',
          overflow: 'auto',
          background: 'black',
          color: 'white',
        }}
      >
        <div>Content</div>
      </div>
    </RemoveScroll>
  </div>
);

export const PinchZoomOverflow = () => (
  <div className="App">
    <RemoveScroll allowPinchZoom style={{ height: '5000px' }}>
      <div
        style={{
          border: '1px solid black',
          padding: '20px',
          height: '300px',
          overflow: 'auto',
          background: 'black',
          color: 'white',
        }}
      >
        <div style={{ height: '1000px' }}>Content</div>
      </div>
    </RemoveScroll>
  </div>
);

export const ControlPinchZoomDisabled = () => (
  <div className="App">
    <RemoveScroll style={{ height: '5000px' }}>
      <div
        style={{
          border: '1px solid black',
          padding: '20px',
          height: '300px',
          overflow: 'auto',
          background: 'black',
          color: 'white',
        }}
      >
        <div style={{ height: '1000px' }}>Content</div>
      </div>
    </RemoveScroll>
  </div>
);

export default {
  title: 'pinch zoom',
};
