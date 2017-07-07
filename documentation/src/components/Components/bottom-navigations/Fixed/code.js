import Fixed from '!!raw-loader!./index.jsx';
import Recent from '!!raw-loader!./Recent.jsx';
import Favorites from '!!raw-loader!./Favorites.jsx';
import Nearby from '!!raw-loader!./Nearby.jsx';

export default `/* Fixed.jsx */
${Fixed}
\`\`\`

\`\`\`js
/* Recent.jsx */
${Recent}
\`\`\`

\`\`\`js
/* Favorites.jsx */
${Favorites}
\`\`\`

\`\`\`js
/* Nearby.jsx */
${Nearby}
`;

