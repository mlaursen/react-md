/*eslint-env jest*/
jest.unmock('../Dialog');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass,
} from 'react-addons-test-utils';

import Dialog from '../Dialog';
import DialogFooter from '../DialogFooter';
import Toolbar from '../../Toolbars/Toolbar';

describe('Dialog', () => {
  it('merges className and style', () => {
    const style = { display: 'block' };
    const className = 'test';
    const contentStyle = { background: 'black' };
    const contentClassName = 'content';
    const dialog = renderIntoDocument(
      <Dialog
        isSimple={true}
        isFullPage={false}
        style={style}
        className={className}
        contentStyle={contentStyle}
        contentClassName={contentClassName}
      />
    );

    const dialogNode = findDOMNode(dialog);
    expect(dialogNode.style.display).toBe(style.display);
    expect(dialogNode.classList.contains(className)).toBe(true);

    const contentNode = findRenderedDOMComponentWithClass(dialog, 'md-dialog-content');
    expect(contentNode.style.background).toBe(contentStyle.background);
    expect(contentNode.classList.contains(contentClassName)).toBe(true);
  });

  it('displays any children in the dialog content', () => {
    const content = 'Hello, World!';
    const dialog = renderIntoDocument(
      <Dialog
        isSimple={true}
        isFullPage={false}
      >
        {content}
      </Dialog>
    );

    const contentNode = findRenderedDOMComponentWithClass(dialog, 'md-dialog-content');
    expect(contentNode.textContent).toBe(content);
  });

  it('renders a title in the header for a simple dialog', () => {
    const title = 'Test';
    const dialog = renderIntoDocument(
      <Dialog
        isSimple={true}
        isFullPage={false}
        title={title}
      />
    );

    const titleNodes = scryRenderedDOMComponentsWithClass(dialog, 'md-title');
    expect(titleNodes.length).toBe(1);

    const [titleNode] = titleNodes;
    expect(titleNode.textContent).toBe(title);
  });

  it('renders a toolbar in the dialog header for a full page dialog', () => {
    const dialog = renderIntoDocument(
      <Dialog
        isSimple={false}
        isFullPage={true}
        title="Test"
        actionLeft="Left"
        actionRight="Right"
      />
    );

    const toolbars = scryRenderedComponentsWithType(dialog, Toolbar);
    expect(toolbars.length).toBe(1);
  });

  it('renders a dialog footer when there are actions', () => {
    let dialog = renderIntoDocument(
      <Dialog
        isSimple={true}
        isFullPage={false}
      />
    );

    let footerNodes = scryRenderedComponentsWithType(dialog, DialogFooter);
    expect(footerNodes.length).toBe(0);

    dialog = renderIntoDocument(
      <Dialog
        isSimple={true}
        isFullPage={false}
        actions={[]}
      />
    );

    footerNodes = scryRenderedComponentsWithType(dialog, DialogFooter);
    expect(footerNodes.length).toBe(0);

    dialog = renderIntoDocument(
      <Dialog
        isSimple={true}
        isFullPage={false}
        actions={[{ onClick: jest.genMockFunction() }]}
      />
    );

    footerNodes = scryRenderedComponentsWithType(dialog, DialogFooter);
    expect(footerNodes.length).toBe(1);
  });
});
