import React from 'react';
import ExamplesPage from 'components/ExamplesPage';

import readme from './README.md';
import MenuAutocomplete from './MenuAutocomplete';
import MenuAutocompleteRaw from '!!raw-loader!./MenuAutocomplete.jsx';
import InlineAutocomplete from './InlineAutocomplete';
import InlineAutocompleteRaw from '!!raw-loader!./InlineAutocomplete.jsx';
import GithubAjaxExample from './GithubAjaxExample';
import GithubAjaxExampleRaw from './GithubAjaxExample/code';
import ToolbarSearch from './ToolbarSearch';
import ToolbarSearchRaw from './ToolbarSearch/code';

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
  title: 'Toolbar Search',
  description: `
This example will show how you can use Autocompletes in a toolbar for applications that have a primary function
of searching. This will also introduce one of the "special" props \`simplifiedMenu\`.

All of the menus or components that use the [Layover](/components/helpers/layovers) component try to keep themselves
within the viewport automatically and a lot of additional functionality. This is fine for **most** cases, but there
are times where this is not desired. All the additional positioning logic can be removed by enabling \`simplifiedMenu\`
which will just apply \`position: relative\` to the \`<div>\` surrounding the \`Autocomplete\` and apply \`position: absolute\`
to the list of suggestions that appear. Most of the time this should be enough to display automatically below the item,
but you can add some simple positioning CSS if it is needed.

The main reason for using the \`simplifiedMenu\` in this example is for three reasons:
1. I want the autocomplete list to be the same width and positioned equal with the inset toolbar.
There isn't really anything built into the \`Layover\` right now to support getting the width of
parent elements to match and fixing to the left/right of other elements.
2. This example is within the \`MobileEmulator\` component. The styles become a bit more
complex since I override the default styles and force mobile rules within this container.
3. None of the normal logic to keep the list within the viewport is really needed since it is
within a fixed toolbar at the top of the page. It is simpler and more performant to just add the
few lines of CSS instead.
> The \`Layover\` **does** automatically update the logic when it is in a fixed element like this
and simplifies the logic a a bit, but we still run into a few problems in this example because of
the \`MobileEmulator\`.
  `,
  code: ToolbarSearchRaw,
  children: <ToolbarSearch />,
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
