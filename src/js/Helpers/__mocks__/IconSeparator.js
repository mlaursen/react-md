/* eslint-env jest */
import React from 'react';

export default jest.fn(({ label, children, ...props }) => {
  delete props.iconBefore;
  delete props.component;

  return <div {...props}><span>{label}</span>{children}</div>;
});
