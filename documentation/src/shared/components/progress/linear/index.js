import React from 'react';

import IndeterminateExample from './IndeterminateExample';
import IndeterminateExampleRaw from '!!raw!./IndeterminateExample';
import DeterminateExample from './DeterminateExample';
import DeterminateExampleRaw from '!!raw!./DeterminateExample';
import QueryIndeterminateExample from './QueryIndeterminateExample';
import QueryIndeterminateExampleRaw from '!!raw!./QueryIndeterminateExample';

export default [{
  title: 'Indeterminate Example',
  code: IndeterminateExampleRaw,
  children: <IndeterminateExample />,
}, {
  title: 'Determinate Example',
  code: DeterminateExampleRaw,
  children: <DeterminateExample />,
}, {
  title: 'Query Indeterminate Example',
  code: QueryIndeterminateExampleRaw,
  children: <QueryIndeterminateExample />,
}];
