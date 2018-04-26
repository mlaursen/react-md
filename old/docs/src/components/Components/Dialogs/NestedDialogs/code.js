import NestedDialogs from '!!raw-loader!./index.jsx';
import MainDialog from '!!raw-loader!./MainDialog.jsx';
import InnerDialog from '!!raw-loader!./InnerDialog.jsx';

export default `/* NestedDialogs.jsx */
${NestedDialogs}
\`\`\`

\`\`\`jsx
/* MainDialog.jsx */
${MainDialog}
\`\`\`

\`\`\`jsx
${InnerDialog}
`;
