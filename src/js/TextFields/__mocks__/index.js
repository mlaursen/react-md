/*eslint-env jest*/
import React from 'react';

export default jest.genMockFunction()
  .mockImplementation(originalProps => {
    const { ...props } = originalProps;
    delete props.floatingLabel;
    delete props.fullWidth;
    delete props.block;
    return <input type="input" {...props} />;
  });
