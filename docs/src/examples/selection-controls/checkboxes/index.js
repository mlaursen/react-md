import React from 'react';

import SimpleExamples from './SimpleExamples';
import SimpleExamplesRaw from '!!raw!./SimpleExamples';

import StatefulExample from './StatefulExample';
import StatefulExampleRaw from '!!raw!./StatefulExample';

import ToDoList from './ToDoList';
import ToDoListRaw from '!!raw!./ToDoList';

import './_checkboxes.scss';

export default [{
  title: 'Simple Examples',
  className: 'default-text-color',
  code: SimpleExamplesRaw,
  children: <SimpleExamples />,
}, {
  title: 'Stateful Example',
  code: StatefulExampleRaw,
  className: 'default-text-color',
  children: <StatefulExample />,
}, {
  title: 'To Do List Example',
  className: 'default-text-color',
  code: ToDoListRaw,
  children: <ToDoList />,
}];
