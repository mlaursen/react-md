import React from 'react';
import Toolbar, { ActionArea } from 'react-md/lib/Toolbars';
import { IconButton } from 'react-md/lib/Buttons';

import { githubHref } from '../../utils';

export default function ToolbarExamples() {
  return (
    <div className="toolbar-container">
      <Toolbar
        primary
        className="react-md-docs-toolbar"
        title="react-md"
        actionLeft={<IconButton>menu</IconButton>}
        actionsRight={(
          <ActionArea>
            <IconButton href={githubHref} iconClassName="fa fa-github" />
          </ActionArea>
        )}
      />
    </div>
  );
}
