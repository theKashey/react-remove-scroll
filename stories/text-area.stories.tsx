import React from 'react';

import ReactRemoveScroll from '../src/Combination';

export const TextAreaOverflow = () => (
  <ReactRemoveScroll>
    <div>
      <textarea>{'hello'.repeat(500)}</textarea>
    </div>
  </ReactRemoveScroll>
);

export default {
  title: 'textarea',
};
