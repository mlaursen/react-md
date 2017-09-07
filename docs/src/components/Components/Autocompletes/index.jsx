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
import UsingSmartMenus from './UsingSmartMenus';
import UsingSmartMenusRaw from '!!raw-loader!./UsingSmartMenus.jsx';

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
of searching and how you can modify the list items for highlighting search results.
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
}, {
  title: 'Using "Smart" Menus',
  description: `
Starting with 1.1.0, [Menus](/components/menus) have been updated with some additional logic to "smartly" position
themselves within the viewport. This feature is disabled by default due to weird mobile issues and backwards
compatibility.

The "smart" menus are pretty fantastic on desktop devices and works like a charm. The autocomplete menu will either
display below the text field (default) or above the text field if it is near the bottom of the page. As the user types,
the list size might shrink and automatically position itself below the text field when there is enough space below.

Mobile devices are a pain on the other hand. Android and iOS calculate the viewport height differently and iOS doesn't
shrink the viewport height when the soft keyboard is visible while Android does. This means that the default behavior
would make Android devices automatically close their list or position the list off the screen when the user types or
focuses the text field. It _works_ decently on iOS but most of the list items will not be visible. It becomes even worse
if the Autocomplete is fixed in a toolbar.  This website's search component actually uses the "smart" menu due to the
fact that most of my traffic is developers and desktop users.

Since I actually prefer the Android calculation of viewport height and the majority of this website's mobile traffic is
Android, the main search works pretty well with some additional props applied to the "smart" menu. The Autocomplete can
attempt to fill the entire viewport (left, right, top, bottom) by enabling the \`fillViewportWidth\` and \`fillViewportHeight\`
props. This will apply the following styles to the list (with some additional checks for page positioning):

\`\`\`js
const styles = {
  left: this.props.minLeft,
  right: this.props.minRight,
  top: this.props.minTop,
  bottom: this.props.minBottom,
};
\`\`\`

Since Android decreases the viewport height to exclude the soft keyboard, the autocomplete list will fill the entire viewport.
iOS will have the menu items flow underneath the keyboard limiting the amount of scrolling the user can do.

### Summing it up
- "smart" menus pretty great desktop
- "smart" menus unpredictable between mobile OS due to viewport height calculation

Check out how this programming autocomplete interacts compared to the first example and the differences the main website
works on desktop vs mobile.
  `,
  code: UsingSmartMenusRaw,
  children: <UsingSmartMenus />,
}];

const Autocompletes = () => <ExamplesPage description={readme} examples={examples} />;

export default Autocompletes;
