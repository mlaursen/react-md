/*eslint-env jest*/
/*eslint-disable react/prop-types*/
jest.unmock('../EditDialogColumn');
jest.unmock('../TableColumn');
jest.unmock('../DataTable');
jest.unmock('../TableBody');
jest.unmock('../TableRow');
jest.unmock('../../TextFields');
jest.unmock('../../TextFields/TextField');
jest.unmock('../../TextFields/TextDivider');
jest.unmock('../../TextFields/TextFieldMessage');
jest.unmock('../../TextFields/FloatingLabel');
jest.unmock('../../constants/keyCodes');

import React from 'react';
import {
  Simulate,
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
  findRenderedDOMComponentWithTag,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass,
} from 'react-addons-test-utils';

import DataTable from '../DataTable';
import TableBody from '../TableBody';
import TableRow from '../TableRow';
import EditDialogColumn from '../EditDialogColumn';
import FlatButton from '../../Buttons/FlatButton';
import TextField from '../../TextFields/TextField';
import { ENTER, ESC } from '../../constants/keyCodes';

class Table extends React.Component {
  render() {
    return (
      <DataTable>
        <TableBody>
          <TableRow>
            <th>A</th>
            {this.props.children}
          </TableRow>
        </TableBody>
      </DataTable>
    );
  }
}

describe('EditDialogColumn', () => {
  it('merges className and style', () => {
    const columnStyle = { fontWeight: 'bold' };
    const columnClassName = 'col-test';
    const style = { display: 'block' };
    const className = 'test';
    const edit = renderIntoDocument(
      <Table>
        <EditDialogColumn
          style={style}
          className={className}
          columnClassName={columnClassName}
          columnStyle={columnStyle}
        />
      </Table>
    );

    const editNodeTD = findRenderedDOMComponentWithTag(edit, 'td');
    const editNode = findRenderedDOMComponentWithClass(edit, 'md-edit-dialog');

    expect(editNodeTD.style.fontWeight).toBe(columnStyle.fontWeight);
    expect(editNodeTD.classList.contains(columnClassName)).toBe(true);

    expect(editNode.style.display).toBe(style.display);
    expect(editNode.classList.contains(className)).toBe(true);
  });

  it('prevents the column from automatically growing by adding the prevent-grow className', () => {
    const edit = renderIntoDocument(<Table><EditDialogColumn /></Table>);
    const editNodeTD = findRenderedDOMComponentWithTag(edit, 'td');

    expect(editNodeTD.classList.contains('prevent-grow')).toBe(true);
  });

  it('adds the animating className when the focus state changes on the text field', () => {
    const edit = renderIntoDocument(
      <Table>
        <EditDialogColumn />
      </Table>
    );

    let editNode = findRenderedDOMComponentWithClass(edit, 'md-edit-dialog');
    let textNode = findRenderedDOMComponentWithClass(edit, 'md-text-field');

    expect(editNode.classList.contains('animating')).toBe(false);
    expect(editNode.classList.contains('active')).toBe(false);

    Simulate.focus(textNode);
    editNode = findRenderedDOMComponentWithClass(edit, 'md-edit-dialog');
    expect(editNode.classList.contains('animating')).toBe(true);
    expect(editNode.classList.contains('active')).toBe(true);

    jest.runOnlyPendingTimers();
    editNode = findRenderedDOMComponentWithClass(edit, 'md-edit-dialog');
    expect(editNode.classList.contains('animating')).toBe(false);
    expect(editNode.classList.contains('active')).toBe(true);

    Simulate.keyDown(textNode, { which: ENTER, keyCode: ENTER });
    editNode = findRenderedDOMComponentWithClass(edit, 'md-edit-dialog');
    expect(editNode.classList.contains('animating')).toBe(true);
    expect(editNode.classList.contains('active')).toBe(false);

    jest.runOnlyPendingTimers();
    expect(editNode.classList.contains('animating')).toBe(false);
    expect(editNode.classList.contains('active')).toBe(false);
  });

  it('does not render the maxLength prop on the text field when it is not active', () => {
    const edit = renderIntoDocument(
      <Table>
        <EditDialogColumn maxLength={140} />
      </Table>
    );

    let textField = findRenderedComponentWithType(edit, TextField);
    const textFieldNode = findRenderedDOMComponentWithClass(edit, 'md-text-field');

    expect(textField.props.maxLength).toBe(null);
    Simulate.focus(textFieldNode);

    // Skip animating
    jest.runOnlyPendingTimers();
    textField = findRenderedComponentWithType(edit, TextField);
    expect(textField.props.maxLength).toBe(140);
  });

  it('saves the value when the enter key is pressed', () => {
    const edit = renderIntoDocument(
      <Table>
        <EditDialogColumn />
      </Table>
    );

    const editComp = findRenderedComponentWithType(edit, EditDialogColumn);
    editComp.save = jest.genMockFunction();

    let textNode = findRenderedDOMComponentWithClass(edit, 'md-text-field');
    Simulate.change(textNode, { target: { value: 'abc' } });

    textNode = findRenderedDOMComponentWithClass(edit, 'md-text-field');
    expect(textNode.value).toBe('abc');

    Simulate.keyDown(textNode, { which: ENTER, keyCode: ENTER });
    expect(editComp.save.mock.calls.length).toBe(1);
  });

  it('calls the onOkClick function on save with the current value and the click or enter keypress event', () => {
    const onOkClick = jest.genMockFunction();
    const edit = renderIntoDocument(
      <Table>
        <EditDialogColumn onOkClick={onOkClick} />
      </Table>
    );

    let textNode = findRenderedDOMComponentWithClass(edit, 'md-text-field');
    Simulate.change(textNode, { target: { value: 'abc' } });
    textNode = findRenderedDOMComponentWithClass(edit, 'md-text-field');
    expect(textNode.value).toBe('abc');

    Simulate.keyDown(textNode, { which: ENTER, keyCode: ENTER });
    expect(onOkClick.mock.calls.length).toBe(1);
    expect(onOkClick.mock.calls[0].length).toBe(2);
    expect(onOkClick.mock.calls[0][0]).toBe('abc');
  });

  it('resets the value when the escape key is pressed', () => {
    const edit = renderIntoDocument(
      <Table>
        <EditDialogColumn defaultValue="abc" />
      </Table>
    );

    let textNode = findRenderedDOMComponentWithClass(edit, 'md-text-field');
    Simulate.focus(textNode); // Focus sets the cancel value
    Simulate.change(textNode, { target: { value: 'Where\'s Waldo' } });

    textNode = findRenderedDOMComponentWithClass(edit, 'md-text-field');
    expect(textNode.value).toBe('Where\'s Waldo');

    Simulate.keyDown(textNode, { which: ESC, keyCode: ESC });
    textNode = findRenderedDOMComponentWithClass(edit, 'md-text-field');
    expect(textNode.value).toBe('abc');
  });

  it('calls the onCancelClick function on canceling the changes with the initial value and the event', () => {
    const onCancelClick = jest.genMockFunction();
    const edit = renderIntoDocument(
      <Table>
        <EditDialogColumn onCancelClick={onCancelClick} defaultValue="abc" />
      </Table>
    );

    let textNode = findRenderedDOMComponentWithClass(edit, 'md-text-field');
    Simulate.focus(textNode);
    Simulate.change(textNode, { target: { value: 'Hello, World' } });
    textNode = findRenderedDOMComponentWithClass(edit, 'md-text-field');
    expect(textNode.value).toBe('Hello, World');

    Simulate.keyDown(textNode, { which: ESC, keyCode: ESC });
    expect(onCancelClick.mock.calls.length).toBe(1);
    expect(onCancelClick.mock.calls[0].length).toBe(2);
    expect(onCancelClick.mock.calls[0][0]).toBe('abc');
  });

  it('displays a modal title when the column is large and active', () => {
    const edit = renderIntoDocument(
      <Table>
        <EditDialogColumn large={true} title="Test" />
      </Table>
    );

    let dialogNode = findRenderedDOMComponentWithClass(edit, 'md-edit-dialog');
    expect(dialogNode.textContent).toBe('');

    Simulate.focus(findRenderedDOMComponentWithClass(edit, 'md-text-field'));
    jest.runOnlyPendingTimers();

    dialogNode = findRenderedDOMComponentWithClass(edit, 'md-edit-dialog');
    expect(dialogNode.textContent).toBe('Test');
  });

  it('displays a dialog footer with a cancel and ok button in a large dialog', () => {
    const edit = renderIntoDocument(
      <Table>
        <EditDialogColumn large={true} title="Test" />
      </Table>
    );

    let footerNodes = scryRenderedDOMComponentsWithClass(edit, 'md-dialog-footer');
    let buttons = scryRenderedComponentsWithType(edit, FlatButton);
    expect(footerNodes.length).toBe(0);
    expect(buttons.length).toBe(0);

    Simulate.focus(findRenderedDOMComponentWithClass(edit, 'md-text-field'));
    jest.runOnlyPendingTimers();

    footerNodes = scryRenderedDOMComponentsWithClass(edit, 'md-dialog-footer');
    buttons = scryRenderedComponentsWithType(edit, FlatButton);
    expect(footerNodes.length).toBe(1);
    expect(buttons.length).toBe(2);
  });
});
