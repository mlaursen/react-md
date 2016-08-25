/* eslint-env jest */
jest.unmock('../PanelContent');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import PanelContent from '../PanelContent';
import PanelControls from '../PanelControls';
import Divider from '../../Dividers';

const PROPS = {
  onSave: jest.fn(),
  onCancel: jest.fn(),
  saveLabel: 'Save',
  cancelLabel: 'Cancel',
};

describe('PanelContent', () => {
  it('passes the style and className to the md-panel-content container', () => {
    const props = Object.assign({}, PROPS, { style: { display: 'block' }, className: 'test' });
    const content = renderIntoDocument(<PanelContent {...props} />);
    const contentNode = findDOMNode(content);
    const panelContent = contentNode.querySelector('.md-panel-content');

    expect(contentNode.style.display).not.toBe(props.style.display);
    expect(contentNode.className).not.toContain(props.className);

    expect(panelContent.style.display).toBe(props.style.display);
    expect(panelContent.className).toContain(props.className);
  });

  it('renders a divider component', () => {
    const content = renderIntoDocument(<PanelContent {...PROPS} />);
    const dividers = scryRenderedComponentsWithType(content, Divider);

    expect(dividers.length).toBe(1);
  });

  it('renders a divider component with the md-panel-divider className', () => {
    const content = renderIntoDocument(<PanelContent {...PROPS} />);
    const divider = findRenderedComponentWithType(content, Divider);

    expect(divider.props.className).toBe('md-panel-divider');
  });

  it('renders the PanelControls component', () => {
    const content = renderIntoDocument(<PanelContent {...PROPS} />);
    const controls = scryRenderedComponentsWithType(content, PanelControls);

    expect(controls.length).toBe(1);
  });

  it('renders the PanelControls component with the correct props', () => {
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
    const controls = findRenderedComponentWithType(content, PanelControls);

    expect(controls.props.onSave).toBe(props.onSave);
    expect(controls.props.onCancel).toBe(props.onCancel);
    expect(controls.props.saveType).toBe(props.saveType);
    expect(controls.props.saveLabel).toBe(props.saveLabel);
    expect(controls.props.savePrimary).toBe(props.savePrimary);
    expect(controls.props.saveSecondary).toBe(props.saveSecondary);
    expect(controls.props.cancelType).toBe(props.cancelType);
    expect(controls.props.cancelLabel).toBe(props.cancelLabel);
    expect(controls.props.cancelPrimary).toBe(props.cancelPrimary);
    expect(controls.props.cancelSecondary).toBe(props.cancelSecondary);
  });
});
