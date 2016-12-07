import ShiftingExampleRaw from '!!raw!!./ShiftingExample';
import MoviesAndTVRaw from '!!raw!./MoviesAndTV';
import MusicRaw from '!!raw!./Music';
import BooksRaw from '!!raw!./Books';
import SectionRaw from '!!raw!./Section';
import NewsStandRaw from '!!raw!./NewsStand';
import NewsItemRaw from '!!raw!./NewsItem';
import StylesRaw from '!!raw!./_styles.scss';

export default `
/* ShiftingExample.jsx */
${ShiftingExampleRaw}
\`\`\`

\`\`\`js
/* MoviesAndTV.jsx */
${MoviesAndTVRaw}
\`\`\`

\`\`\`js
/* Music.jsx */
${MusicRaw}
\`\`\`

\`\`\`js
/* Books.jsx */
${BooksRaw}
\`\`\`

\`\`\`js
/* Section.jsx */
${SectionRaw}
\`\`\`

\`\`\`js
/* NewsStand.jsx */
${NewsStandRaw}
\`\`\`

\`\`\`js
/* NewsItem.jsx */
${NewsItemRaw}
\`\`\`

\`\`\`scss
${StylesRaw}
`;
