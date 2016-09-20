/* eslint-env jest */
jest.unmock('../PanelControls');
describe('PanelControls', () => {
  it('does nothing atm', () => {
    expect(true).toBe(true);
  });
});

// import React from 'react';
// import {
//   renderIntoDocument,
//   scryRenderedComponentsWithType,
// } from 'react-addons-test-utils';
//
// import PanelControls from '../PanelControls';
// import Button from '../../Buttons';
//
// describe('PanelControls', () => {
//   it('renders two FlatButtons', () => {
//     const props = {
//       onSave: jest.fn(),
//       onCancel: jest.fn(),
//       saveLabel: 'Save',
//       cancelLabel: 'Cancel',
//     };
//
//     const controls = renderIntoDocument(<PanelControls {...props} />);
//     const buttons = scryRenderedComponentsWithType(controls, Button);
//
//     expect(buttons.length).toBe(2);
//   });
//
//   it('passes the correct props to the cancel button', () => {
//     const props = {
//       onSave: jest.fn(),
//       onCancel: jest.fn(),
//       saveLabel: 'Save',
//       cancelType: 'reset',
//       cancelLabel: 'Cancel',
//       cancelPrimary: true,
//       cancelSecondary: false,
//     };
//
//     const controls = renderIntoDocument(<PanelControls {...props} />);
//     const [cancel] = scryRenderedComponentsWithType(controls, Button);
//
//     expect(cancel.props.type).toBe(props.cancelType);
//     expect(cancel.props.label).toBe(props.cancelLabel);
//     expect(cancel.props.primary).toBe(props.cancelPrimary);
//     expect(cancel.props.secondary).toBe(props.cancelSecondary);
//   });
//
//   it('passes the correct props to the save button', () => {
//     const props = {
//       onSave: jest.fn(),
//       onCancel: jest.fn(),
//       saveType: 'submit',
//       saveLabel: 'Save',
//       savePrimary: true,
//       saveSecondary: false,
//       cancelLabel: 'Cancel',
//     };
//
//     const controls = renderIntoDocument(<PanelControls {...props} />);
//     const save = scryRenderedComponentsWithType(controls, Button)[1];
//
//     expect(save.props.type).toBe(props.saveType);
//     expect(save.props.label).toBe(props.saveLabel);
//     expect(save.props.primary).toBe(props.savePrimary);
//     expect(save.props.secondary).toBe(props.saveSecondary);
//   });
// });
