import React from 'react';

import MenuAutocomplete from './MenuAutocomplete';
import MenuAutocompleteRaw from '!!raw!./MenuAutocomplete';

import InlineAutocomplete from './InlineAutocomplete';
import InlineAutocompleteRaw from '!!raw!./InlineAutocomplete';

import AjaxAutocomplete from './AjaxAutocomplete';
import AjaxAutocompleteRaw from '!!raw!./AjaxAutocomplete';

export default [{
  title: 'Menu Completion View',
  description: `
This example shows how you can use the two built in filters or a 3rd party library to do text matching. When
the user starts typing, the \`Autocomplete\` will search the list of \`data\` for any text matching the current
value. For this example, all the filtered data and results will appear in a drop down menu.
`,
  code: MenuAutocompleteRaw,
  children: <MenuAutocomplete />,
}, {
  title: 'Inline Completion View',
  description: `
This example shows how a completion can be done inline instead. By default, the autocomplete will find the first
match and display it. It can be autocompleted by either:
  - pressing the tab key on desktops
  - tapping the selection text on touch devices

The default \`findInlineSuggestion\` function just does a simple ignore case matching. See the PropTypes tab for more
information.
`,
  code: InlineAutocompleteRaw,
  children: <InlineAutocomplete />,
}, {
  title: 'Ajax Autocomplete',
  description: `
A lot of the time, you won't actually have access to all of the autocomplete matches because you will be using some
amazing backend indexer and apis to populate while the user types.

Since the list of \`data\` will always be updating and the filtering is done by a server, set the \`filter\` prop to
\`null\` to prevent any unneeded work on the client side. It is also normally helpful to set the \`type\` to \`search\`
instead of the default \`text\`.

The example below will use the [Spotify API](https://developer.spotify.com/web-api/endpoint-reference/) to
search for an artist, and then display their albums once it is selected.
`,
  code: AjaxAutocompleteRaw,
  children: <AjaxAutocomplete />,
}];
