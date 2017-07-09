import DrawerWithContent from '!!raw-loader!./index.jsx';
import PhotoDrawer from '!!raw-loader!./PhotoDrawer.jsx';
import PhotoList from '!!raw-loader!./PhotoList.jsx';
import styles from '!!raw-loader!./_styles.scss';

export default `/* DrawerWithContent.jsx */
${DrawerWithContent}
\`\`\`

\`\`\`js
/* PhotoDrawer.jsx */
${PhotoDrawer}
\`\`\`

\`\`\`js
/* PhotoList.jsx */
${PhotoList}
\`\`\`

\`\`\`scss
/* _styles.scss */
${styles}
`;
