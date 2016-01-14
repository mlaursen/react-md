import React from 'react';
import AppBar, { ActionArea } from 'react-md/AppBar';
import { IconButton } from 'react-md/Buttons';

import { githubHref } from '../../utils';

export default function AppBarExamples() {
  return (
    <div className="app-bar-container">
      <AppBar
        primary
        className="react-md-docs-app-bar"
        title="react-md"
        menuButton={<IconButton>menu</IconButton>}
        actionsRight={(
          <ActionArea>
            <IconButton href={githubHref} iconClassName="fa fa-github" />
          </ActionArea>
        )}
      />
    </div>
  );
}
