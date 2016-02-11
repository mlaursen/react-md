import React from 'react';

import Markdown from '../Markdown';
import readme from './README.md';

const GettingStarted = (props) => <Markdown {...props} markdown={readme} className="documentation text-container" />;
GettingStarted.path = 'getting-started';

export default GettingStarted;
