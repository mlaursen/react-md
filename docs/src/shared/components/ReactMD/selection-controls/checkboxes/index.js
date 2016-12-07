import React from 'react';

import SimpleExamples from './SimpleExamples';
import SimpleExamplesRaw from '!!raw!./SimpleExamples';

import StatefulExample from './StatefulExample';
import StatefulExampleRaw from '!!raw!./StatefulExample';

import ToDoList from './ToDoList';
import ToDoListRaw from '!!raw!./ToDoList';
import ToDoRaw from '!!raw!./ToDo';
import ToDoCSSRaw from '!!raw!./_todo-list.scss';

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
  code: `
/* ToDoList.jsx */
${ToDoListRaw}
\`\`\`

\`\`\`js
/* ToDo.jsx */
${ToDoRaw}
\`\`\`

\`\`\`scss
/* _todo-list.scss */
${ToDoCSSRaw}
`,
  children: <ToDoList />,
}];
