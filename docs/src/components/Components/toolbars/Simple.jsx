import React from 'react';
import Toolbar from 'react-md/lib/Toolbars';

import Nav from './common/Nav';
import KebabMenu from './common/KebabMenu';

const Simple = () => (
  <div className="toolbars__examples">
    <Toolbar
      nav={<Nav />}
      title="Transparent"
      actions={<KebabMenu id="toolbar-transparent-kebab-menu" />}
    />
    <Toolbar
      themed
      nav={<Nav />}
      title="Themed"
      actions={<KebabMenu id="toolbar-themed-kebab-menu" />}
    />
    <Toolbar
      colored
      nav={<Nav />}
      title="Colored"
      actions={<KebabMenu id="toolbar-colored-kebab-menu" />}
    />
    <Toolbar
      colored
      prominent
      nav={<Nav />}
      title="Prominent"
      actions={<KebabMenu id="toolbar-prominent-kebab-menu" />}
    />
    <Toolbar
      colored
      prominentTitle
      nav={<Nav />}
      title="Prominent Title"
      actions={<KebabMenu id="toolbar-prominent-title-kebab-menu" />}
    />
  </div>
);
export default Simple;
