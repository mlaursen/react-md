/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';

import EditDialog from '../EditDialog';
import Dialog from '../../Dialogs/Dialog';
import AccessibleFakeButton from '../../Helpers/AccessibleFakeButton';

const PROPS = {
  id: 'test-dialog',
  textFieldId: 'test-dialog-field',
  label: 'Hello!',
  onOpen: jest.fn(),
  onClose: jest.fn(),
  children: <input type="text" />,
  visible: false,
};

describe('EditDialog', () => {
  it('should render the Dialog component when visible', () => {
    const editDialog = mount(<EditDialog {...PROPS} />);
    expect(editDialog.find(Dialog).length).toBe(0);

    editDialog.setProps({ visible: true });
    expect(editDialog.find(Dialog).length).toBe(1);
  });

  it('should provide the correct props to the Dialog based on the large prop', () => {
    const props = {
      ...PROPS,
      dialogStyle: { background: 'red' },
      dialogClassName: 'testing-dialog',
      dialogContentStyle: { background: 'orange' },
      dialogContentClassName: 'testing-content',
      visible: true,
      large: false,
      title: 'Hello, World!',
      actions: [{ label: 'Woop' }],
      dialogZDepth: 3,
    };
    const editDialog = mount(<EditDialog {...props} />);
    let dialogProps = editDialog.find(Dialog).get(0).props;
    expect(dialogProps.id).toBe(props.id);
    expect(dialogProps['aria-labelledby']).toBe(props.textFieldId);
    expect(dialogProps.style.background).toBe(props.dialogStyle.background);
    expect(dialogProps.className).toContain(props.dialogClassName);
    expect(dialogProps.className).toContain('md-background');
    expect(dialogProps.className).toContain('md-edit-dialog');
    expect(dialogProps.contentStyle).toBe(props.dialogContentStyle);
    expect(dialogProps.contentClassName).toContain(props.dialogContentClassName);
    expect(dialogProps.contentClassName).toContain('md-edit-dialog__content');
    expect(dialogProps.title).toBe(null);
    expect(dialogProps.focusOnMount).toBe(true);
    expect(dialogProps.containFocus).toBe(props.large);
    expect(dialogProps.actions).toBe(null);
    expect(dialogProps.zDepth).toBe(props.dialogZDepth);

    editDialog.setProps({ large: true });
    dialogProps = editDialog.find(Dialog).get(0).props;
    expect(dialogProps['aria-labelledby']).toBeUndefined();
    expect(dialogProps.title).toBe(props.title);
    expect(dialogProps.containFocus).toBe(true);
    expect(dialogProps.actions).toBe(props.actions);
  });

  it('should render an AccessibleFakeButton as the layover\'s toggle', () => {
    const editDialog = mount(<EditDialog {...PROPS} />);
    const btn = editDialog.find(AccessibleFakeButton);
    expect(btn.length).toBe(1);

    let props = btn.get(0).props;
    expect(props.className).toContain('md-edit-dialog__label');
    expect(props.noFocusOutline).toBe(PROPS.visible);
    expect(props.onClick).toBe(PROPS.onOpen);
    expect(props.onFocus).toBe(PROPS.onOpen);
    expect(props.children).toBe(PROPS.label);

    editDialog.setProps({ placeholder: true });
    props = editDialog.find(AccessibleFakeButton).get(0).props;
    expect(props.className).toContain('md-text--secondary');
  });
});
