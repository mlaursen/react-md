import React from 'react';

import Markdown from '../Markdown';
import readme from './README.md';

const Customization = (props) => <Markdown {...props} markdown={readme} className="documentation text-container" />;
Customization.path = 'customization';

export default Customization;
