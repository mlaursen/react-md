/*eslint-env jest*/
import React from 'react';

export default jest.fn(({ isOpen, children }) => {
  return (
    <div>{isOpen && children}</div>
  );
});
