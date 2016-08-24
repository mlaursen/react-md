/* eslint-env jest*/
jest.unmock('../PickerFooter');

import React from 'react';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import PickerFooter from '../PickerFooter';
import FlatButton from '../../Buttons/FlatButton';

describe('PickerFooter', () => {
  it('renders two flat buttons', () => {
    const okLabel = 'Ok';
    const okPrimary = true;
    const onOkClick = jest.fn();
    const cancelLabel = 'Cancel';
    const cancelPrimary = false;
    const onCancelClick = jest.fn();

    const pickerFooter = renderIntoDocument(
      <PickerFooter
        okLabel={okLabel}
        okPrimary={okPrimary}
        onOkClick={onOkClick}
        cancelLabel={cancelLabel}
        cancelPrimary={cancelPrimary}
        onCancelClick={onCancelClick}
      />
    );

    const buttons = scryRenderedComponentsWithType(pickerFooter, FlatButton);
    expect(buttons.length).toBe(2);

    const [cancel, ok] = buttons;

    expect(cancel.props.label).toBe(cancelLabel);
    expect(cancel.props.primary).toBe(cancelPrimary);
    expect(cancel.props.secondary).toBe(!cancelPrimary);
    expect(cancel.props.onClick).toBe(onCancelClick);

    expect(ok.props.label).toBe(okLabel);
    expect(ok.props.primary).toBe(okPrimary);
    expect(ok.props.secondary).toBe(!okPrimary);
    expect(ok.props.onClick).toBe(onOkClick);
  });
});
