import React from 'react';
import Paper from 'react-md/lib/Papers';

const PaperExamples = () => {
  const papers = Array.apply(null, new Array(6)).map((_, i) => {
    return <Paper key={i} zDepth={i} raiseOnHover={i === 0} className="paper-example">zDepth = {i}</Paper>;
  });

  return (
    <div className="paper-container">
      {papers}
    </div>
  );
};

export default PaperExamples;
