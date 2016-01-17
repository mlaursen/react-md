import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import SelectField from 'react-md/SelectFields';

import DocPage from 'react-md-documentation';
import SelectFieldExamples from './SelectFieldExamples';
import SelectFieldExamplesRaw from '!!raw!./SelectFieldExamples';
import FakeTextEditor from '../../FakeTextEditor';
import FakeTextEditorRaw from '!!raw!../../FakeTextEditor';
import './_select-fields.scss';

export default class SelectFields extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <DocPage
        components={[{
          component: SelectField,
          details: [{
            name: 'menuItems',
            pt: 'arrayOf(object || string || number)',
            desc: `The list of menu items to display once opened. This can be
            a list of \`string\`, \`number\` or \`object\`. If you have a list of objects,
            you can define the label/values for each of the menu items by specifying
            the \`itemLabel\` and \`itemValue\`.`,
          }, {
            name: 'itemLabel',
            pt: 's',
            desc: `The item label key used when displaying a list item. Only
            used if the menu items are objects.`,
          }, {
            name: 'itemValue',
            pt: 's',
            desc: `The item label key used when selecting an item. Only used
            if the menu items are objects`,
          }, {
            name: 'name',
            pt: 's',
            desc: 'A name to use for the select field.',
          }, {
            name: 'placeholder',
            pt: 's',
            desc: 'An optional placeholder to use if the current value is false-ish.',
          }, {
            name: 'value',
            pt: 's',
            desc: 'An optional value to use if you want to manage this component.',
          }, {
            name: 'onChange',
            pt: 'f',
            desc: `An optional function to call when a new value is selected. The onChange
            function is called with \`onChange(item, index)\` where \`item\` is the newly
            selected item from the \`menuItems\`, and the \`index\` is the index of the
            newly selected item.`,
          }, {
            name: 'defaultValue',
            pt: 's',
            desc: `An optional default value to set for the select field. If \`value\` is
            given, defaultValue will not be used.`,
          }, {
            name: 'expandRight',
            pt: 'ba',
            desc: 'Boolean if the menu should expand from right to left instead of left to right.',
          }, {
            name: 'menuBelow',
            pt: 'ba',
            desc: `Boolean if the menu should be rendered below the select field instead of
            over the select field.`,
          }, {
            name: 'textFieldPositioned',
            pt: 'ba',
            desc: `Boolean if the select field should be positioned like a text field. This
            means that the \`height\`, \`padding\`, and \`font-size\` will match text fields.
            You can also have a parent element with a \`className\` of \`.md-form\`, and
            all select fields will be affected.`,
          }, {
            name: 'itemsVisible',
            pt: 'nu',
            desc: `This is the number of items that will be visible when the menu is open. This
            value should really only be modified if you change the default \`max-height\` of
            the open menu. To follow design principals, the \`max-height\` should show at least
            half of the next item if it scrollable. The \`itemsVisible\` prop should be
            the rounded down integer.`,
          }],
        }]}
        examples={[{
          markdown: SelectFieldExamplesRaw,
          children: <SelectFieldExamples />,
        }, {
          markdown: FakeTextEditorRaw,
          children: <FakeTextEditor />,
        }]}
        >
        <p>
          This is also called Dropdown buttons in the material design specs.
        </p>
        <p>
          A dropdown button selects between multiple selections. The button
          displays the current state and a down arrow. Available states may
          be shown as a list of strings, a palette, or icons, for example.
        </p>
      </DocPage>
    );
  }
}
