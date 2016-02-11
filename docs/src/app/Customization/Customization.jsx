import React from 'react';

import DisplayReadme from '../DisplayReadme';
import readme from './README.md';

const Customization = (props) => <DisplayReadme {...props} readme={readme} />;
Customization.path = 'customization';

export default Customization;
