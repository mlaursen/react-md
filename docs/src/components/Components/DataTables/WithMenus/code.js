import WithMenus from '!!raw-loader!./index.jsx';
import KebabMenu from '!!raw-loader!./KebabMenu';
import SomeCustomMenu from '!!raw-loader!./SomeCustomMenu';
import styles from '!!raw-loader!./_styles.scss';

export default `/* WithMenus.jsx */
${WithMenus}
\`\`\`

\`\`\`jsx
/* KebabMenu.jsx */
${KebabMenu}
\`\`\`

\`\`\`jsx
/* SomeCustomMenu.jsx */
${SomeCustomMenu}
\`\`\`

\`\`\`scss
/* _styles.scss */
${styles}
`;
