import README from './README.md';

import MenuAutocomplete from './MenuAutocomplete';
import MenuAutocompleteRaw from '!!raw-loader!./MenuAutocomplete';


export default {
  readme: README,
  examples: [{
    title: 'Menu Completion View',
    description: `
This example shows how you can use the two built in filters or a 3rd party library to do text matching. When
the user starts typing, the \`Autocomplete\` will search the list of \`data\` for any text matching the current
value. For this example, all the filtered data and results will appear in a drop down menu.
  `,
    code: MenuAutocompleteRaw,
    component: MenuAutocomplete,
  }],
};
