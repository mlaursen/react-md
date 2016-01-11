import React from 'react';
import Toolbar from 'react-md/Toolbar';
import Paper from 'react-md/Paper';
import { IconButton } from 'react-md/Buttons';

export default function ToolbarExamples() {
  return (
    <div className="paper-container">
      <Paper zDepth={2} className="paper-example">
        <Toolbar>
          <IconButton>menu</IconButton>
        </Toolbar>
      </Paper>
      <Paper zDepth={2} className="paper-example">
        <Toolbar primary>
          <IconButton>menu</IconButton>
        </Toolbar>
      </Paper>
      <Paper zDepth={2} className="paper-example">
        <Toolbar secondary>
          <IconButton>menu</IconButton>
        </Toolbar>
      </Paper>
    </div>
  );
}
