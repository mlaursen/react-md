import React from 'react';

import { mergeClassNames } from '../utils';

export default function Header({ menuButton, title, actionsRight, ...props }) {
  return (
    <header {...props} className={mergeClassNames(props, 'md-app-bar', 'app-header')}>
      {React.cloneElement(menuButton, { className: 'menu-btn' })}
      {title && <h3 className="md-title">{title}</h3>}
      {actionsRight}
    </header>
  );
}
