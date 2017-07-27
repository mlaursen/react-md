import DynamicContentTable from '!!raw-loader!./index.jsx';
import TableActions from '!!raw-loader!./TableActions.jsx';
import DessertRow from '!!raw-loader!./DessertRow.jsx';
import FlatOrIconButton from '!!raw-loader!./FlatOrIconButton.jsx';
import AddDessertsDialog from '!!raw-loader!./AddDessertsDialog.jsx';
import FormGroup from '!!raw-loader!./FormGroup.jsx';
import styles from '!!raw-loader!./_styles.scss';

export default `/* DynamicContentTable.jsx */
${DynamicContentTable}
\`\`\`

\`\`\`jsx
/* TableActions.jsx */
${TableActions}
\`\`\`

\`\`\`jsx
/* DessertRow.jsx */
${DessertRow}
\`\`\`

\`\`\`jsx
/* FlatOrIconButton.jsx */
${FlatOrIconButton}
\`\`\`

\`\`\`jsx
/* AddDessertsDialog.jsx */
${AddDessertsDialog}
\`\`\`

\`\`\`jsx
/* FormGroup.jsx */
${FormGroup}
\`\`\`

\`\`\`scss
/* _styles.scss */
${styles}
`;
