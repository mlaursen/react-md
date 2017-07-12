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

\`\`\`js
/* TableActions.jsx */
${TableActions}
\`\`\`

\`\`\`js
/* DessertRow.jsx */
${DessertRow}
\`\`\`

\`\`\`js
/* FlatOrIconButton.jsx */
${FlatOrIconButton}
\`\`\`

\`\`\`js
/* AddDessertsDialog.jsx */
${AddDessertsDialog}
\`\`\`

\`\`\`js
/* FormGroup.jsx */
${FormGroup}
\`\`\`

\`\`\`scss
/* _styles.scss */
${styles}
`;
