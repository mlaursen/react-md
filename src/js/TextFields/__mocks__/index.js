/*eslint-env jest*/
import React from 'react';

export default jest.genMockFunction().mockImplementation(props => <input type="input" {...props} />);
