import React from 'react';
import Paper from 'react-md/lib/Papers';

const PaperExamples = () => (
  <div className="paper-container">
    {[...new Array(6)].map((_, i) => (
      <Paper
        key={i}
        zDepth={i}
        raiseOnHover={i === 0}
        className="paper-example"
      >
        zDepth = {i}
      </Paper>
    ))}
  </div>
);

export default PaperExamples;
