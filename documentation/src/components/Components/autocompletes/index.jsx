import React from 'react';
import ExamplesPage from 'components/ExamplesPage';

import readme from './README.md';
import MenuAutocomplete from './MenuAutocomplete';
import MenuAutocompleteRaw from '!!raw-loader!./MenuAutocomplete.jsx';
import InlineAutocomplete from './InlineAutocomplete';
import InlineAutocompleteRaw from '!!raw-loader!./InlineAutocomplete.jsx';
import GithubAjaxExample from './GithubAjaxExample';
import GithubAjaxExampleRaw from '!!raw-loader!./GithubAjaxExample';

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
[propTypes tab](/components/autocompletes?tab=1#autocomplete-proptypes-findInlineSuggestion) for more information.
  `,
  code: InlineAutocompleteRaw,
  children: <InlineAutocomplete />,
}, {
  title: 'Github Ajax Example',
  code: GithubAjaxExampleRaw,
  children: <GithubAjaxExample />,
}];

const Autocompletes = () => <ExamplesPage description={readme} examples={examples} />;

export default Autocompletes;
