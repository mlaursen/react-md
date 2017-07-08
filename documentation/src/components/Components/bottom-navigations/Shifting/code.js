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

\`\`\`js
/* AppToolbar.jsx */
${AppToolbar}
\`\`\`

\`\`\`js
/* MoviesAndTV.jsx */
${MoviesAndTV}
\`\`\`

\`\`\`js
/* Music.jsx */
${Music}
\`\`\`

\`\`\`js
/* Books.jsx */
${Books}
\`\`\`

\`\`\`js
/* NewsStand.jsx */
${NewsStand}
\`\`\`

\`\`\`js
/* NewsItem.jsx */
${NewsItem}
\`\`\`

\`\`\`js
/* Section.jsx */
${Section}
\`\`\`

\`\`\`js
/* CloseExample.jsx */
${CloseExample}
\`\`\`

\`\`\`scss
/* _styles.scss */
${styles}
`;
