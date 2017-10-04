import React from 'react';
import { CircularProgress } from 'react-md';

import { ACCESSIBILITY_PROPS } from 'state/drawer/contentProps';

const LoadingContent = () => (
  <div className="md-grid md-grid--40-16 loading-content">
    <CircularProgress id={ACCESSIBILITY_PROPS['aria-describedby']} centered />
  </div>
);

export default LoadingContent;
