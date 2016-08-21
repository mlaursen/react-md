import React from 'react';

import SidebarExample from './SidebarExample';
import SidebarExampleRaw from '!!raw!./SidebarExample';
import SimpleSCSS from '!!raw!./_sidebar-simple.scss';

import ResponsiveSidebarExample from './ResponsiveSidebarExample';
import ResponsiveSidebarExampleRaw from '!!raw!./ResponsiveSidebarExample';
import InboxHeaderRaw from '!!raw!./InboxHeader';
import InboxListRaw from '!!raw!./InboxList';
import InboxContentRaw from '!!raw!./InboxContent';
import ResponsiveSCSS from '!!raw!./_sidebar-responsive.scss';

export default [{
  title: 'Sidebar Example',
  code: `
/* SidebarExample.jsx */
${SidebarExampleRaw}
\`\`\`

\`\`\`scss
/* _sidebar-simple.scss */
${SimpleSCSS}
`,
  children: <SidebarExample />,
}, {
  title: 'Responsive Example',
  code: `
/* ResponsiveSidebarExample.jsx */
${ResponsiveSidebarExampleRaw}
\`\`\`

\`\`\`js
/* InboxHeader.jsx */
${InboxHeaderRaw}
\`\`\`

\`\`\`js
/* InboxList.jsx */
${InboxListRaw}
\`\`\`

\`\`\`js
/* InboxContent.jsx */
${InboxContentRaw}
\`\`\`

\`\`\`scss
/* _sidebar-simple.scss */
${ResponsiveSCSS}
`,
  children: <ResponsiveSidebarExample />,
}];
