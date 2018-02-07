import MarkdownExample from '!!raw-loader!./MarkdownExample.jsx';
import ColorPreviewer from '!!raw-loader!components/Markdown/ColorPreviewer.jsx';
import Markdown from '!!raw-loader!components/Markdown/Markdown.jsx';
import styles from '!!raw-loader!components/Markdown/_styles.scss';

export default `/* MarkdownExample.jsx */
${MarkdownExample}
\`\`\`

\`\`\`jsx
/* ColorPreviewer.jsx */
${ColorPreviewer}
\`\`\`

\`\`\`jsx
/* Markdown.jsx */
${Markdown}
\`\`\`

\`\`\`scss
/* _styles.scss */
${styles}
`;
