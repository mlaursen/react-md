import React from 'react';
import SelectField from 'react-md/lib/SelectFields';

const MENU_ITEMS = [{
  title: 'The Flight',
  value: 'some-guid-1',
}, {
  title: 'Room of Plates',
  value: 'some-guid-2',
}, {
  title: 'The Sleek Boot',
  value: 'some-guid-3',
}, {
  title: 'Night Hunting',
  value: 'some-guid-4',
}, {
  title: 'Rain and Coffee',
  value: 'some-guid-5',
}, {
  title: 'Ocean View',
  value: 'some-guid-6',
}, {
  title: 'Lovers on the Roof',
  value: 'some-guid-7',
}, {
  title: 'Lessons from Delhi',
  value: 'some-guid-8',
}, {
  title: 'Mountaineers',
  value: 'some-guid-9',
}, {
  title: 'Plains in the Night',
  value: 'some-guid-10',
}, {
  title: 'Dear Olivia',
  value: 'some-guid-11',
}, {
  title: 'Driving Lessons',
  value: 'some-guid-12',
}];

const TextFieldStyling = () => (
  <div className="md-grid">
    <SelectField
      id="select-field-styling-1"
      label="With help text"
      placeholder="Something"
      itemLabel="title"
      menuItems={MENU_ITEMS}
      className="md-cell"
      helpText="I have some help text!"
    />
    <SelectField
      id="select-field-styling-2"
      label="Required"
      placeholder="Something"
      itemLabel="title"
      menuItems={MENU_ITEMS}
      className="md-cell"
      required
      errorText="This field is required"
    />
    <SelectField
      id="select-field-styling-3"
      label="Disabled"
      itemLabel="title"
      menuItems={MENU_ITEMS}
      className="md-cell"
      disabled
    />
  </div>
);
export default TextFieldStyling;
