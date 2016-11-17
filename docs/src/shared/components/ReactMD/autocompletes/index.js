import React from 'react';

import MenuAutocomplete from './MenuAutocomplete';
import MenuAutocompleteRaw from '!!raw!./MenuAutocomplete';

import InlineAutocomplete from './InlineAutocomplete';
import InlineAutocompleteRaw from '!!raw!./InlineAutocomplete';

import AjaxAutocomplete from './AjaxAutocomplete';
import AjaxAutocompleteRaw from '!!raw!./AjaxAutocomplete';

import InToolbarExample from './InToolbarExample';
import InToolbarExampleRaw from '!!raw!./InToolbarExample';

import SearchRaw from '!!raw!components/Search/Search';
import SearchSCSSRaw from '!!raw!components/Search/_search.scss';

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
}, {
  title: 'Lazy Loading Ajax',
  description: `
Since the \`Autocomplete\` also accepts valid React elements in the list items that won't be searched, it is
possible to create a lazy loading list of suggestions in the autocomplete. This is very beneficial when your
api paginates the search results. This is actually how the main search has been implemented for this site.

The site's search uses the [react-waypoint](https://github.com/brigade/react-waypoint) component to fetch the next
10 items in the search results when the user scrolls to the end of the list. This continues until there are no
results remaining. You can view the source code for the search by clicking the source code button on this card.
  `,
  code: `
/* Search.jsx */
${SearchRaw}
\`\`\`

\`\`\`scss
${SearchSCSSRaw}
`,
  children: null,
}, {
  title: 'In Toolbar',
  description: `
When an autocomplete appears in a toolbar, it will automatically update the list to appear below the toolbar
and fixed to the entire width of the screen while tablets and desktops will be absolutely positioned and
have a width equal to the text autocomplete's with.

If you want the text field to gain the font size of the toolbar's normal font size, you will need to add
\`inputClassName="md-text-field--toolbar"\` to the autocomplete.

If you want the autocomplete to align with the default title keyline, you will need to add the \`className="md-title--toolbar"\`
to the autocomplete.
  `,
  code: InToolbarExampleRaw,
  children: <InToolbarExample />,
}];
