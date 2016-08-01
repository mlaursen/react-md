/*eslint-env jest*/
import React from 'react';

export default jest.genMockFunction()
  .mockImplementation(({ floatingLabel, ...props }) => <input type="input" {...props} />); //eslint-disable-line
