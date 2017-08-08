import SimpleFileUpload from '!!raw-loader!./index.jsx';
import UploadProgress from '!!raw-loader!./UploadProgress.jsx';
import UploadedFileCard from '!!raw-loader!./UploadedFileCard.jsx';
import styles from '!!raw-loader!./_styles.scss';

export default `/* SimpleFileUpload.jsx */
${SimpleFileUpload}
\`\`\`

\`\`\`jsx
/* UploadProgress.jsx */
${UploadProgress}
\`\`\`

\`\`\`jsx
/* UploadedFileCard.jsx */
${UploadedFileCard}
\`\`\`

\`\`\`scss
/* _styles.scss */
${styles}
`;
