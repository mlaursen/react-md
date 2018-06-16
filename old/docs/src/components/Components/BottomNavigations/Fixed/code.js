import Fixed from '!!raw-loader!./index.jsx';
import Recent from '!!raw-loader!./Recent.jsx';
import Favorites from '!!raw-loader!./Favorites.jsx';
import Nearby from '!!raw-loader!./Nearby.jsx';

export default `/* Fixed.jsx */
${Fixed}
\`\`\`

\`\`\`jsx
/* Recent.jsx */
${Recent}
\`\`\`

\`\`\`jsx
/* Favorites.jsx */
${Favorites}
\`\`\`

\`\`\`jsx
/* Nearby.jsx */
${Nearby}
`;

