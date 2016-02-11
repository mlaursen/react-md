import React from 'react';

import DisplayReadme from '../DisplayReadme';
import readme from './README.md';

const GettingStarted = (props) => <DisplayReadme {...props} readme={readme} />;
GettingStarted.path = 'getting-started';

export default GettingStarted;
