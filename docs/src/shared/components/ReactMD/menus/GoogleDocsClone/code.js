import GoogleDocsCloneRaw from '!!raw!./index.jsx';
import OptionsToolbarRaw from '!!raw!./OptionsToolbar';
import StarDocumentRaw from '!!raw!./StarDocument';
import DocMenusRaw from '!!raw!./DocMenus';
import DropDownMenuRaw from '!!raw!./DropDownMenu';
import CheckboxListItemRaw from '!!raw!./CheckboxListItem';
import LastEditRaw from '!!raw!./LastEdit';
import LastEditTooltipRaw from '!!raw!./LastEditTooltip';
import PlaygroundRaw from '!!raw!./Playground';

import StylesRaw from '!!raw!./_google-docs.scss';

export default `
/* GoogleDocsClone.jsx */
${GoogleDocsCloneRaw}
\`\`\`

\`\`\`js
/* OptionsToolbar.jsx */
${OptionsToolbarRaw}
\`\`\`

\`\`\`js
/* StarDocument.jsx */
${StarDocumentRaw}
\`\`\`

\`\`\`js
/* DocMenus.jsx */
${DocMenusRaw}
\`\`\`

\`\`\`js
/* DropDownMenu.jsx */
${DropDownMenuRaw}
\`\`\`

\`\`\`js
/* CheckboxListItem.jsx */
${CheckboxListItemRaw}
\`\`\`

\`\`\`js
/* LastEdit.jsx */
${LastEditRaw}
\`\`\`

\`\`\`js
/* LastEditTooltip.jsx */
${LastEditTooltipRaw}
\`\`\`

\`\`\`js
/* Playground.jsx */
${PlaygroundRaw}
\`\`\`

\`\`\`scss
/* _google-docs.scss */
${StylesRaw}
`;
