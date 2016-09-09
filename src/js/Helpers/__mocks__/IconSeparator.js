/* eslint-env jest */
import React from 'react';

export default jest.fn(({ label, children, ...props }) => {
  delete props.iconBefore;

  return <div {...props}><span>{label}</span>{children}</div>;
});
