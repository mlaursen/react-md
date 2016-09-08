import React from 'react';
import Toolbar from 'react-md/lib/Toolbars';
import Button from 'react-md/lib/Buttons';

import { GITHUB_LINK } from 'constants';

const SimpleExample = () => (
  <Toolbar
    primary
    title="react-md"
    actionLeft={<Button icon>menu</Button>}
    actionsRight={<Button icon href={GITHUB_LINK} iconClassName="fa fa-github" className="md-toolbar-item margin-left-auto" />}
  />
);

export default SimpleExample;
