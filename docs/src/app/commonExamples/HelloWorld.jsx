import React, { PropTypes } from 'react';
import { loremIpsum } from '../utils';

const HelloWorld = ({ params }) => {
  return (
    <div style={{ padding: '1em' }}>
      <h3 className="md-display-1">Hello, World!</h3>
      <h6 className="md-title">Coming from {params.suffix}</h6>
      {loremIpsum(8)}
    </div>
  );
};

HelloWorld.propTypes = {
  params: PropTypes.object.isRequired,
};

export default HelloWorld;
