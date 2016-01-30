import React from 'react';
import Paper from 'react-md/lib/Papers';

export default function PaperExamples() {
  return (
    <div className="paper-container">
      {[0, 1, 2, 3, 4, 5].map(i => (
        <Paper zDepth={i} key={i} className="paper-example">
          <p>zDepth = {i}</p>
          {i === 0 && <p>Raises on hover</p>}
        </Paper>
      ))}
    </div>
  );
}
