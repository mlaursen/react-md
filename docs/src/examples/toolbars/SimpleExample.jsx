import React from 'react';
import Toolbar from 'react-md/lib/Toolbars';
import { IconButton } from 'react-md/lib/Buttons';

import { GITHUB_LINK } from 'constants';

const SimpleExample = () => (
  <Toolbar
    primary
    title="react-md"
    actionLeft={<IconButton>menu</IconButton>}
    actionsRight={<IconButton href={GITHUB_LINK} iconClassName="fa fa-github" className="md-toolbar-item margin-left-auto" />}
  />
);

export default SimpleExample;
