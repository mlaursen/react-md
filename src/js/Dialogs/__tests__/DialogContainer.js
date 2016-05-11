/*eslint-env jest*/
jest.unmock('../DialogContainer');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import DialogContainer from '../DialogContainer';
import Dialog from '../Dialog';

describe('DialogContainer', () => {
  it('merges className and style', () => {
    const style = { display: 'block' };
    const className = 'test';
    const close = jest.genMockFunction();
    const dialogContainer = renderIntoDocument(
      <DialogContainer style={style} className={className} isOpen={false} close={close} />
    );

    const dialogContainerNode = findDOMNode(dialogContainer);
    expect(dialogContainerNode.style.display).toBe(style.display);
    expect(dialogContainerNode.classList.contains(className)).toBe(true);
  });

  it('renders a dialog when the isOpen prop is true', () => {
    const close = jest.genMockFunction();
    let dialog = renderIntoDocument(<DialogContainer isOpen={false} close={close} />);

    let dialogNode = scryRenderedComponentsWithType(dialog, Dialog);
    expect(dialogNode.length).toBe(0);

    dialog = renderIntoDocument(<DialogContainer isOpen={true} close={close} />);
    dialogNode = scryRenderedComponentsWithType(dialog, Dialog);
    expect(dialogNode.length).toBe(1);
  });

  it('renders a simple dialog if there are no actions', () => {
    const close = jest.genMockFunction();
    let dialog = renderIntoDocument(
      <DialogContainer
        isOpen={false}
        close={close}
      />
    );

    let dialogNode = findDOMNode(dialog);
    expect(dialogNode.classList.contains('simple')).toBe(true);

    dialog = renderIntoDocument(
      <DialogContainer
        isOpen={false}
        close={close}
        actions={[]}
      />
    );

    dialogNode = findDOMNode(dialog);
    expect(dialogNode.classList.contains('simple')).toBe(true);

    dialog = renderIntoDocument(
      <DialogContainer
        isOpen={false}
        close={close}
        actions={[{ onClick: close }]}
      />
    );

    dialogNode = findDOMNode(dialog);
    expect(dialogNode.classList.contains('simple')).toBe(false);
  });
});
