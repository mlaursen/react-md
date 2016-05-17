/*eslint-env jest*/
import React from 'react';

export default jest.genMockFunction().mockImplementation(({ isOpen, children }) => {
  return (
    <div>{isOpen && children}</div>
  );
});
