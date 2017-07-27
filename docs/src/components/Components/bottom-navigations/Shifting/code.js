import Shifting from '!!raw-loader!./index.jsx';
import AppToolbar from '!!raw-loader!./AppToolbar.jsx';
import MoviesAndTV from '!!raw-loader!./MoviesAndTV.jsx';
import Music from '!!raw-loader!./Music.jsx';
import Books from '!!raw-loader!./Books.jsx';
import NewsStand from '!!raw-loader!./NewsStand.jsx';
import NewsItem from '!!raw-loader!./NewsItem.jsx';
import Section from '!!raw-loader!./Section.jsx';
import CloseExample from '!!raw-loader!./CloseExample.jsx';
import styles from '!!raw-loader!./_styles.scss';

export default `/* ShiftingExample.jsx */
${Shifting}
\`\`\`

\`\`\`jsx
/* AppToolbar.jsx */
${AppToolbar}
\`\`\`

\`\`\`jsx
/* MoviesAndTV.jsx */
${MoviesAndTV}
\`\`\`

\`\`\`jsx
/* Music.jsx */
${Music}
\`\`\`

\`\`\`jsx
/* Books.jsx */
${Books}
\`\`\`

\`\`\`jsx
/* NewsStand.jsx */
${NewsStand}
\`\`\`

\`\`\`jsx
/* NewsItem.jsx */
${NewsItem}
\`\`\`

\`\`\`jsx
/* Section.jsx */
${Section}
\`\`\`

\`\`\`jsx
/* CloseExample.jsx */
${CloseExample}
\`\`\`

\`\`\`scss
/* _styles.scss */
${styles}
`;
