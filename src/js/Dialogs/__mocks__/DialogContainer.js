/* eslint-env jest*/
import React from 'react';

export default jest.fn(({ isOpen, children }) => (
  <div>{isOpen && children}</div>
));
