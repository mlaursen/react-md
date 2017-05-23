/* eslint-env jest*/
/* eslint-disable max-len */
jest.unmock('../FileInput');

import React from 'react';
import { findDOMNode } from 'react-dom';
import { shallow } from 'enzyme';
import {
  Simulate,
  renderIntoDocument,
  findRenderedDOMComponentWithTag,
} from 'react-dom/test-utils';

import FileInput from '../FileInput';

const File = jest.fn(name => ({
  name: name || 'Test.jpg',
  lastModifiedDate: new Date(),
  isClosed: true,
  size: 39202,
  type: 'image/jpg',
}));

describe('FileInput', () => {
  it('merges className and style', () => {
    const style = { display: 'block' };
    const className = 'test';
    const fileInput = renderIntoDocument(
      <FileInput id="test" style={style} className={className} onChange={jest.fn()} />
    );

    const fileInputNode = findDOMNode(fileInput);
    expect(fileInputNode.style.display).toBe(style.display);
    expect(fileInputNode.className).toContain(className);
  });

  it('returns a single file when multiple is false onChange', () => {
    const onChange = jest.fn();
    const fileInput = renderIntoDocument(<FileInput id="test" onChange={onChange} />);

    const input = findRenderedDOMComponentWithTag(fileInput, 'input');

    // can't instantiate fully, so we can make an almost exact reference
    const files = [new File()];

    Simulate.change(input, { target: { files } });

    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][0]).toEqual(files[0]);
  });

  it('returns null when the user cancel\'s a file selection when multiple is false onChange', () => {
    const onChange = jest.fn();
    const fileInput = renderIntoDocument(<FileInput id="test" onChange={onChange} />);

    const input = findRenderedDOMComponentWithTag(fileInput, 'input');
    // Cancel returns empty list
    const files = [];

    Simulate.change(input, { target: { files } });

    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][0]).toBe(null);
  });

  it('returns a list of files when multiple is true onChange', () => {
    const onChange = jest.fn();
    const fileInput = renderIntoDocument(<FileInput id="test" onChange={onChange} multiple />);

    const input = findRenderedDOMComponentWithTag(fileInput, 'input');

    // can't instantiate fully, so we can make an almost exact reference
    const files = [new File(), new File('Test2.jpg')];

    Simulate.change(input, { target: { files } });

    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][0]).toEqual(files);
  });

  it('returns an empty list of files when the user cancels an upload and multiple is true onChange', () => {
    const onChange = jest.fn();
    const fileInput = renderIntoDocument(<FileInput id="test" onChange={onChange} multiple />);

    const input = findRenderedDOMComponentWithTag(fileInput, 'input');
    const files = [];

    Simulate.change(input, { target: { files } });

    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][0].length).toBe(0);
    expect(onChange.mock.calls[0][0]).toEqual(files);
  });

  it('should correctly pass the form control props to the input element', () => {
    const props = { id: 'file-input', name: 'images', accept: 'images/*', onChange: jest.fn() };
    const fileInput = shallow(<FileInput {...props} />);
    let input = fileInput.find('input').get(0);
    expect(input.props.id).toBe(props.id);
    expect(input.props.name).toBe(props.name);
    expect(input.props.accept).toBe(props.accept);
    expect(input.props.type).toBe('file');

    fileInput.setProps({ multiple: true });
    input = fileInput.find('input').get(0);
    expect(input.props.multiple).toBe(true);

    fileInput.setProps({ disabled: true });
    input = fileInput.find('input').get(0);
    expect(input.props.disabled).toBe(true);
  });
});
