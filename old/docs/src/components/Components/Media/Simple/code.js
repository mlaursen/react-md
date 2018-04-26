import Simple from '!!raw-loader!./index.jsx';
import Example from '!!raw-loader!./Example.jsx';
import Ratio11 from '!!raw-loader!./Ratio11.jsx';
import Ratio43 from '!!raw-loader!./Ratio43.jsx';
import Ratio169 from '!!raw-loader!./Ratio169.jsx';

export default `/* Simple.jsx */
${Simple}
\`\`\`

\`\`\`jsx
/* Example.jsx */
${Example}
\`\`\`

\`\`\`jsx
/* Ratio11.jsx */
${Ratio11}
\`\`\`

\`\`\`jsx
/* Ratio43.jsx */
${Ratio43}
\`\`\`

\`\`\`jsx
/* Ratio169.jsx */
${Ratio169}
`;
