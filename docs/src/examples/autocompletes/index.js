import React from 'react';

import MenuAutocomplete from './MenuAutocomplete';
import MenuAutocompleteRaw from '!!raw!./MenuAutocomplete';

import InlineAutocomplete from './InlineAutocomplete';
import InlineAutocompleteRaw from '!!raw!./InlineAutocomplete';

import MixedDataTypesAutocomplete from './MixedDataTypesAutocomplete';
import MixedDataTypesAutocompleteRaw from '!!raw!./MixedDataTypesAutocomplete';

import SpotifySearch from './SpotifySearch';
import SpotifySearchRaw from '!!raw!./SpotifySearch';
import SpotifyAlbumRaw from '!!raw!./SpotifyAlbum';
import SpotifySCSS from '!!raw!./_spotify.scss';

const spotifyCode = `
/* SpotifySearch.jsx */
${SpotifySearchRaw}
\`\`\`

\`\`\`js
/* SpotifyAlbum.jsx */
${SpotifyAlbumRaw}
\`\`\`

\`\`\`scss
/* _spotify.scss */
${SpotifySCSS}
`;

export default [{
  title: 'Menu Completetion View',
  code: MenuAutocompleteRaw,
  children: <MenuAutocomplete />,
}, {
  title: 'Inline Completion View',
  code: `${InlineAutocompleteRaw}\n\n\`\`\`scss\n${require('!!raw!./_style.scss')}\n`,
  children: <InlineAutocomplete />,
}, {
  title: 'Mixed Data Types Data Prop',
  description: `
The \`data\` prop can be a combination of \`number\`, \`string\`, \`object\`,
or \`React Element\`. The main purpose of this is if you want to be able to
display other elements (like \`Subheaders\`, \`Dividers\`, etc) in the
autocompletion menu. Any \`React Element\` will **not** be included in the
filtering. This is an example of including subheaders in the data.
`,
  code: MixedDataTypesAutocompleteRaw,
  children: <MixedDataTypesAutocomplete />,
}, {
  title: 'Advanced Example: Using Spotify API',
  code: spotifyCode,
  children: <SpotifySearch />,
}];
