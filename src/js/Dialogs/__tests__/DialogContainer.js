/* eslint-env jest */
jest.unmock('../DialogContainer');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  Simulate,
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import DialogContainer from '../DialogContainer';
import Dialog from '../Dialog';

const PROPS = { id: 'test', isOpen: true, onClose: jest.fn() };

describe('DialogContainer', () => {
  it('merges className and style', () => {
    const props = Object.assign({}, PROPS, {
      style: { background: 'black' },
      className: 'test',
    });

    const dialogContainer = renderIntoDocument(<DialogContainer {...props} />);

    const dialogContainerNode = findDOMNode(dialogContainer);
    expect(dialogContainerNode.style.background).toBe(props.style.background);
    expect(dialogContainerNode.className).toContain(props.className);
  });

  it('renders a Dialog when the isOpen prop is true', () => {
    const props = Object.assign({}, PROPS, { isOpen: false });
    let container = renderIntoDocument(<DialogContainer {...props} />);
    let dialogs = scryRenderedComponentsWithType(container, Dialog);
    expect(dialogs.length).toBe(0);

    props.isOpen = true;
    container = renderIntoDocument(<DialogContainer {...props} />);
    dialogs = scryRenderedComponentsWithType(container, Dialog);
    expect(dialogs.length).toBe(1);
  });

  it('calls the onClose prop when the container is clicked', () => {
    const props = Object.assign({}, PROPS, { onClose: jest.fn() });
    const container = renderIntoDocument(<DialogContainer {...props} />);
    const node = findDOMNode(container);

    expect(props.onClose.mock.calls.length).toBe(0);

    Simulate.click(node);
    expect(props.onClose.mock.calls.length).toBe(1);
  });

  it('does not call the onClose prop when the container is clicked and the isOpen prop is false', () => {
    const props = Object.assign({}, PROPS, { onClose: jest.fn(), isOpen: false });
    const container = renderIntoDocument(<DialogContainer {...props} />);
    const node = findDOMNode(container);

    expect(props.onClose.mock.calls.length).toBe(0);

    Simulate.click(node);
    expect(props.onClose.mock.calls.length).toBe(0);
  });

  it('does not call the onClose prop when the container is clicked and the modal prop is true', () => {
    const props = Object.assign({}, PROPS, { onClose: jest.fn(), modal: true, isOpen: true });
    const container = renderIntoDocument(<DialogContainer {...props} />);
    const node = findDOMNode(container);

    expect(props.onClose.mock.calls.length).toBe(0);

    Simulate.click(node);
    expect(props.onClose.mock.calls.length).toBe(0);
  });

  it('passes the styles and classNames correctly to the Dialog component', () => {
    const props = Object.assign({}, PROPS, {
      isOpen: true,
      style: { background: 'orange' },
      className: 'woop-woop',
      dialogStyle: { background: 'red' },
      dialogClassName: 'that-the-sound',
      contentStyle: { background: 'blue' },
      contentClassName: 'of-the-police',
    });

    const container = renderIntoDocument(<DialogContainer {...props} />);
    const dialog = findRenderedComponentWithType(container, Dialog);

    expect(dialog.props.style).toEqual(props.dialogStyle);
    expect(dialog.props.className).toContain(props.dialogClassName);
    expect(dialog.props.contentStyle).toEqual(props.contentStyle);
    expect(dialog.props.contentClassName).toBe(props.contentClassName);
  });
});
// /* eslint-env jest*/
// jest.unmock('../DialogContainer');
//
// import React from 'react';
// import { findDOMNode } from 'react-dom';
// import {
//   renderIntoDocument,
//   scryRenderedComponentsWithType,
// } from 'react-addons-test-utils';
//
// import DialogContainer from '../DialogContainer';
// import Dialog from '../Dialog';
//
// describe('DialogContainer', () => {
//   it('merges className and style', () => {
//     const style = { display: 'block' };
//     const className = 'test';
//     const close = jest.fn();
//     const dialogContainer = renderIntoDocument(
//       <DialogContainer style={style} className={className} isOpen={false} close={close} />
//     );
//
//     const dialogContainerNode = findDOMNode(dialogContainer);
//     expect(dialogContainerNode.style.display).toBe(style.display);
//     expect(dialogContainerNode.classList.contains(className)).toBe(true);
//   });
//
//   it('renders a dialog when the isOpen prop is true', () => {
//     const close = jest.fn();
//     let dialog = renderIntoDocument(<DialogContainer isOpen={false} close={close} />);
//
//     let dialogNode = scryRenderedComponentsWithType(dialog, Dialog);
//     expect(dialogNode.length).toBe(0);
//
//     dialog = renderIntoDocument(<DialogContainer isOpen close={close} />);
//     dialogNode = scryRenderedComponentsWithType(dialog, Dialog);
//     expect(dialogNode.length).toBe(1);
//   });
//
//   it('renders a simple dialog if there are no actions', () => {
//     const close = jest.fn();
//     let dialog = renderIntoDocument(
//       <DialogContainer
//         isOpen={false}
//         close={close}
//       />
//     );
//
//     let dialogNode = findDOMNode(dialog);
//     expect(dialogNode.classList.contains('simple')).toBe(true);
//
//     dialog = renderIntoDocument(
//       <DialogContainer
//         isOpen={false}
//         close={close}
//         actions={[]}
//       />
//     );
//
//     dialogNode = findDOMNode(dialog);
//     expect(dialogNode.classList.contains('simple')).toBe(true);
//
//     dialog = renderIntoDocument(
//       <DialogContainer
//         isOpen={false}
//         close={close}
//         actions={[{ onClick: close }]}
//       />
//     );
//
//     dialogNode = findDOMNode(dialog);
//     expect(dialogNode.classList.contains('simple')).toBe(false);
//   });
// });
