import React from 'react';
import FontIcon from '../FontIcons/FontIcon';

export default function getDeprecatedIcon(className, children, icon) {
  if (className || children) {
    return <FontIcon iconClassName={className}>{children}</FontIcon>;
  }

  return icon;
}
