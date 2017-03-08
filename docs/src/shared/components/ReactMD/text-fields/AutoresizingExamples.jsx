import React from 'react';
import TextField from 'react-md/lib/TextFields';

const resize = {
  min: 180,
  max: 340,
};

const resizeAndNoShrink = {
  ...resize,
  noShrink: true,
};
const AutoresizingExamples = () => (
  <div className="md-grid">
    <div className="md-cell md-cell--12">
      <TextField
        id="floating-auto-resize"
        label="Floating Resize"
        resize={resize}
      />
    </div>
    <div className="md-cell md-cell--12">
      <TextField
        id="single-line-auto-resize"
        placeholder="Single Line Resize"
        resize={resize}
      />
    </div>
    <div className="md-cell md-cell--12 md-grid md-grid--no-spacing">
      {/* added the grid just to get the flex applied agian for the weird bug for multiline text fields */}
      <TextField
        id="multiline-auto-resize"
        label="Multiline Resize"
        rows={4}
        resize={resizeAndNoShrink}
        defaultValue="This example will not shrink in size like the other examples. It will always choose the biggest size."
      />
    </div>
  </div>
);
export default AutoresizingExamples;
