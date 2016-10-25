import React from 'react';

import FixedBottomNavigationExample from './FixedBottomNavigationExample';
import FixedBottomNavigationExampleRaw from '!!raw!./FixedBottomNavigationExample';

import ShiftingBottomNavigationExample from './ShiftingBottomNavigationExample';
import ShiftingBottomNavigationExampleRaw from '!!raw!./ShiftingBottomNavigationExample';

import './_bottom-nav.scss';
import BottomNavSCSS from '!!raw!./_bottom-nav.scss';

const shiftingCode = `
/* ShiftingBottomNavigationExample.jsx */
${ShiftingBottomNavigationExampleRaw}
\`\`\`

\`\`\`scss
/* _bottom-nav.scss */
${BottomNavSCSS}
\`\`\`
`;

export default [{
  title: 'Fixed Bottom Navigation',
  code: FixedBottomNavigationExampleRaw,
  children: <FixedBottomNavigationExample />,
}, {
  title: 'Shifting Bottom Navigation',
  code: shiftingCode,
  children: <ShiftingBottomNavigationExample />,
}];
