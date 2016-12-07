/* eslint-env jest */
/* eslint-disable max-len */
jest.unmock('../PanelContent');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import PanelContent from '../PanelContent';
import DialogFooter from '../../Dialogs/DialogFooter';

const PROPS = {
  onSave: jest.fn(),
  onCancel: jest.fn(),
  saveLabel: 'Save',
  cancelLabel: 'Cancel',
};

describe('PanelContent', () => {
  it('passes the contentStyle and className to the md-panel-content container and the style to the containing div', () => {
    const props = Object.assign({}, PROPS, {
      style: { display: 'block' },
      contentStyle: { background: 'black' },
      className: 'test',
    });
    const content = renderIntoDocument(<PanelContent {...props} />);
    const contentNode = findDOMNode(content);
    const panelContent = contentNode.querySelector('.md-panel-content');

    expect(contentNode.style.display).toBe(props.style.display);
    expect(contentNode.style.background).not.toBe(props.contentStyle.background);
    expect(contentNode.className).not.toContain(props.className);

    expect(panelContent.style.display).not.toBe(props.style.display);
    expect(panelContent.style.background).toBe(props.contentStyle.background);
    expect(panelContent.className).toContain(props.className);
  });

  it('renders the DialogFooter component', () => {
    const content = renderIntoDocument(<PanelContent {...PROPS} />);
    const controls = scryRenderedComponentsWithType(content, DialogFooter);

    expect(controls.length).toBe(1);
  });

  it('renders the DialogFooter component with the correct props', () => {
    const props = Object.assign({}, PROPS, {
      style: { display: 'block' },
      className: 'test',
      saveType: 'submit',
      cancelType: 'reset',
      savePrimary: false,
      saveSecondary: true,
      cancelPrimary: false,
      cancelSecondary: false,
    });

    const content = renderIntoDocument(<PanelContent {...props} />);
    const controls = findRenderedComponentWithType(content, DialogFooter);
    const { actions } = controls.props;
    expect(actions.length).toBe(2);
    const [cancel, save] = actions;

    expect(cancel.type).toBe(props.cancelType);
    expect(cancel.label).toBe(props.cancelLabel);
    expect(cancel.onClick).toBe(props.onCancel);
    expect(cancel.primary).toBe(props.cancelPrimary);
    expect(cancel.secondary).toBe(props.cancelSecondary);

    expect(save.type).toBe(props.saveType);
    expect(save.label).toBe(props.saveLabel);
    expect(save.onClick).toBe(props.onSave);
    expect(save.primary).toBe(props.savePrimary);
    expect(save.secondary).toBe(props.saveSecondary);
  });
});
