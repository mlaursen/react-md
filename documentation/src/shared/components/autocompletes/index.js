import React from 'react';

import MenuAutocomplete from './MenuAutocomplete';
import MenuAutocompleteRaw from '!!raw!./MenuAutocomplete';

import InlineAutocomplete from './InlineAutocomplete';
import InlineAutocompleteRaw from '!!raw!./InlineAutocomplete';

import AjaxAutocomplete from './AjaxAutocomplete';
import AjaxAutocompleteRaw from '!!raw!./AjaxAutocomplete';

export default [{
  title: 'Menu Completion View',
  code: MenuAutocompleteRaw,
  children: <MenuAutocomplete />,
}, {
  title: 'Inline Completion View',
  code: InlineAutocompleteRaw,
  children: <InlineAutocomplete />,
}, {
  title: 'Ajax Autocomplete',
  code: AjaxAutocompleteRaw,
  children: <AjaxAutocomplete />,
}];
