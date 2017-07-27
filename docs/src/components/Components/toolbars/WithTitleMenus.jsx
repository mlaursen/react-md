import React from 'react';
import Toolbar from 'react-md/lib/Toolbars';

import Nav from './common/Nav';
import KebabMenu from './common/KebabMenu';
import TitleMenu from './common/TitleMenu';

const WithTitleMenus = () => (
  <div className="toolbars__examples">
    <Toolbar
      colored
      nav={<Nav />}
      titleMenu={<TitleMenu id="toolbar-title-menu" />}
      actions={<KebabMenu id="toolbar-title-menu-kebab" />}
    />
    <Toolbar
      colored
      prominent
      nav={<Nav />}
      titleMenu={<TitleMenu id="toolbar-prominent-title-menu" />}
      actions={<KebabMenu id="toolbar-prominent-title-menu-kebab" />}
    />
  </div>
);
export default WithTitleMenus;
