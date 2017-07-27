import React from 'react';
import ExamplesPage from 'components/ExamplesPage';

import readme from './README.md';
import MenuAutocomplete from './MenuAutocomplete';
import MenuAutocompleteRaw from '!!raw-loader!./MenuAutocomplete.jsx';
import InlineAutocomplete from './InlineAutocomplete';
import InlineAutocompleteRaw from '!!raw-loader!./InlineAutocomplete.jsx';
import GithubAjaxExample from './GithubAjaxExample';
import GithubAjaxExampleRaw from './GithubAjaxExample/code';

import SearchRaw from '!!raw-loader!components/Search/index.jsx';
import SearchStyles from '!!raw-loader!components/Search/_styles.scss';

const examples = [{
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

The default \`findInlineSuggestion\` function just does a simple ignore case matching. See the 
[propTypes tab](/components/autocompletes?tab=1#autocomplete-proptypes-find-inline-suggestion) for more information.
  `,
  code: InlineAutocompleteRaw,
  children: <InlineAutocomplete />,
}, {
  title: 'Github Ajax Example',
  code: GithubAjaxExampleRaw,
  children: <GithubAjaxExample />,
}, {
  title: 'Paginated/Lazy Loading Results',
  description: `
Since the \`Autocomplete\` also accepts valid React elements in the \`data\` prop, it is possible to create a lazy
loading list of suggestions in the \`Autocomplete\`. This is really nice when the \`Autocomplete\` plugs into a
nice API that paginates results.

The site's search uses pagination for its search results using [react-waypoint](https://github.com/brigade/react-waypoint).
By default, only 10 search results are returned at a time so when a user scrolls near the bottom of the suggestion list,
the next 10 results will be fetched as well. You can view the source code for the search by clicking on the source icon button.
When the \`Autocomplete\` has paginated results, it is recommended to provide the
[total](/components/autocompletes?tab=1#autocomplete-proptypes-total)
prop. This will update each list item in the results with the \`aria-setsize\` and \`aria-setpos\`.

> NOTE: Any item in the list that is a React Element **will be ignored** when typing in the autocomplete.
  `,
  code: `/* Search.jsx */
${SearchRaw}
\`\`\`

\`\`\`scss
${SearchStyles}
  `,
  children: null,
}];

const Autocompletes = () => <ExamplesPage description={readme} examples={examples} />;

export default Autocompletes;
