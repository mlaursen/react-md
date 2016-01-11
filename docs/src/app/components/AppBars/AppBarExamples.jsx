import React from 'react';
import AppBar from 'react-md/AppBar';
import { IconButton } from 'react-md/Buttons';

import { githubHref } from '../../utils';

export default function AppBarExamples() {
  return (
    <div className="app-bar-container">
      <AppBar
        className="app-bar-example"
        title="react-md"
        leftNode={<IconButton>menu</IconButton>}
        rightNode={<IconButton href={githubHref} iconClassName="fa fa-github" />}
      />
    </div>
  );
}
