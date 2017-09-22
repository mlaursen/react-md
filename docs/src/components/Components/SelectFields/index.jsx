import React from 'react';
import ExamplesPage from 'components/ExamplesPage';

import README from './README.md';
import Simple from './Simple';
import SimpleRaw from '!!raw-loader!./Simple.jsx';
import ElementsAndDisabledItems from './ElementsAndDisabledItems';
import ElementsAndDisabledItemsRaw from '!!raw-loader!./ElementsAndDisabledItems.jsx';
import DefaultValuesAndControlling from './DefaultValuesAndControlling';
import DefaultValuesAndControllingRaw from '!!raw-loader!./DefaultValuesAndControlling.jsx';
import TextFieldStyling from './TextFieldStyling';
import TextFieldStylingRaw from '!!raw-loader!./TextFieldStyling.jsx';
import UsingSmartMenus from './UsingSmartMenus';
import UsingSmartMenusRaw from '!!raw-loader!./UsingSmartMenus.jsx';

const examples = [{
  title: 'Simple Examples',
  description: `
When creating a \`SelectField\`, the minimal requirements is to provide a unique \`id\` and
the \`menuItems\` prop. Each menu item will attempt to be converted into a \`ListItem\`. The
\`SelectField\` accepts any of the following data types for a menu item:
- a number
- a string
- an object

When the item is a number or a string, both the \`value\` and \`label\` will be that number or
string.  This means that the \`SelectField\`'s list would show these values as the \`primaryText\`
and when one of those items are selected, the \`SelectField\`'s value would be updated to that
label as well.

If the item is an object, it will extract the \`itemLabel\` and \`itemValue\` from the object and
apply all the remaining keys to the \`ListItem\` component. Additional keys can be removed by
specifying the \`deleteKeys\` prop.

By default, the \`SelectField\` will be rendered like a \`TextField\`, but it can also be updated
to be like a "button". This will add some additional padding, add ink, and not allow the \`label\`
prop. The "button" version will also remove the currently selected item from the list. See
[stripActiveItem](/components/select-fields?tab=1#select-field-proptypes-strip-active-item) for
more information.
  `,
  code: SimpleRaw,
  children: <Simple />,
}, {
  title: 'Elements and Disabling Items',
  description: `
There are times where it is helpful to be able to render additional elements like \`Divider\`s or \`Subheader\`s
in the selection list or disable specific items. If you want to render any additional elements, just add them to
the \`menuItem\` list and they will be rendered. Any items that do not match the \`string\`, \`number\` or \`object\`
shape **will be ignored** as valid selection targets for clicking, touching, or keyboard events.

To disable an item, all that is required is to make sure it is an \`object\`, and add a key \`disabled: true\` to it.
When the item is \`disabled\`, it will not be focusable or selectable.
  `,
  code: ElementsAndDisabledItemsRaw,
  children: <ElementsAndDisabledItems />,
}, {
  title: 'Default Values and Controlling',
  description: `
The \`SelectField\` can be updated to have a \`defaultValue\` that is initially selected. When this value
is set, it will search all the \`menuItems\` for an item that matches that value by using the \`itemValue\`
prop or if it exactly matches the string or number when it is not an object item.

Sometimes, you need greater control over the value of the \`SelectField\`, so you can control it by providing
a \`value\` and \`onChange\` prop to set these yourself. In addition, if you add a menu item that is just the
empty string to your \`menuItems\` list, that can be used to "reset" the value of your \`SelectField\`.
  `,
  code: DefaultValuesAndControllingRaw,
  children: <DefaultValuesAndControlling />,
}, {
  title: 'Text Field Styling',
  description: `
The \`SelectField\` gains most of the styling abilities as the \`TextField\` so you can display
help text, error text/error states and others.
  `,
  code: TextFieldStylingRaw,
  children: <TextFieldStyling />,
}, {
  title: 'Using "Smart" Menus',
  description: `
This example shows how you can enable the "smart" menu feature that was introduced in \`react-md@1.1.0\`. This
will allow the select field list to automatically position itself within the viewport. For more information and
documentation, see [the Menus examples](/components/menus#smart-positioning-menus).
The code for this example is exactly the same as the first example except that the \`simplifiedMenu\` prop is disabled.
  `,
  code: UsingSmartMenusRaw,
  children: <UsingSmartMenus />,
}];

const SelectFields = () => <ExamplesPage description={README} examples={examples} />;
export default SelectFields;
