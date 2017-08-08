import AddingAccessibility from '!!raw-loader!./index.jsx';
import styles from '!!raw-loader!./_styles.scss';
import twitter from '!!raw-loader!icons/twitter.svg';
import snapshot from '!!raw-loader!./__tests__/__snapshots__/index.jsx.snap';

export default `/* AddingAccessibility.jsx */
${AddingAccessibility}
\`\`\`

\`\`\`scss
/* _styles.scss */
${styles}
\`\`\`

\`\`\`html
${twitter}
\`\`\`

\`\`\`text
${snapshot}
`;
