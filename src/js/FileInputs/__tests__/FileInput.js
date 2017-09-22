/* eslint-env jest*/
/* eslint-disable max-len */
import React from 'react';
import { mount } from 'enzyme';

import FileInput from '../FileInput';

const File = jest.fn(name => ({
  name: name || 'Test.jpg',
  lastModifiedDate: new Date(),
  isClosed: true,
  size: 39202,
  type: 'image/jpg',
}));

const FAKE_FILE_PATH = 'C:\\fakepath\\Test.png';

describe('FileInput', () => {
  it('should apply styles correctly', () => {
    global.expectRenderSnapshot(<FileInput id="test-input" style={{ height: 200 }} className="test-class" onChange={() => {}} />);
  });

  it('should call the onChange prop with a single file when the multiple prop is not enabled', () => {
    const onChange = jest.fn();
    const fileInput = mount(<FileInput id="test-input" multiple={false} onChange={onChange} />);

    // can't instantiate fully, so we can make an almost exact reference
    const file = new File();
    const files = [file];
    const event = { target: { files, value: FAKE_FILE_PATH } };
    fileInput.find('input').simulate('change', event);
    expect(onChange).toBeCalled();
    expect(onChange.mock.calls[0][0]).toEqual(file);
  });

  it('should call the onChange prop with a list of files when the multiple prop is enabled', () => {
    const onChange = jest.fn();
    const fileInput = mount(<FileInput id="test-input" multiple onChange={onChange} />);

    const files = [new File()];
    const event = { target: { files, value: FAKE_FILE_PATH } };
    fileInput.find('input').simulate('change', event);
    expect(onChange).toBeCalled();
    expect(onChange.mock.calls[0][0]).toEqual(files);
    onChange.mockClear();

    const files2 = [new File(), new File(), new File(), new File()];
    const event2 = { target: { files: files2, value: FAKE_FILE_PATH } };
    fileInput.find('input').simulate('change', event2);
    expect(onChange).toBeCalled();
    expect(onChange.mock.calls[0][0]).toEqual(files2);
  });

  it('should provide null if the user cancels a file input when multiple is not enabled', () => {
    const onChange = jest.fn();
    const fileInput = mount(<FileInput id="test-input" onChange={onChange} />);

    // Cancel returns an empty list
    const event = { target: { files: [], value: '' } };
    fileInput.find('input').simulate('change', event);
    expect(onChange).toBeCalled();
    expect(onChange.mock.calls[0][0]).toBe(null);
  });

  it('should return an empty list when a user cancels the file input and multiple is enabled', () => {
    const onChange = jest.fn();
    const fileInput = mount(<FileInput id="test-input" onChange={onChange} multiple />);
    const event = { target: { files: [], value: '' } };
    fileInput.find('input').simulate('change', event);
    expect(onChange).toBeCalled();
    expect(onChange.mock.calls[0][0]).toEqual([]);
  });

  it('should render the form control props correctly', () => {
    global.expectRenderSnapshot(
      <FileInput
        id="file-input-1"
        name="images"
        accept="images/*,videos/*"
        onChange={() => {}}
      />
    );
  });

  it('should set the value state with the file name if the allowDuplicates prop is false', () => {
    const input = mount(<FileInput id="test" allowDuplicates={false} />);
    expect(input.state('value')).toBe('');

    const file = new File();
    const event = { target: { files: [file], value: FAKE_FILE_PATH } };
    input.find('input').simulate('change', event);
    expect(input.state('value')).toBe(FAKE_FILE_PATH);

    input.setProps({ multiple: true });
    const event2 = { target: { files: [file, file], value: FAKE_FILE_PATH } };
    input.find('input').simulate('change', event2);
    expect(input.state('value')).toBe(FAKE_FILE_PATH);
  });

  it('should keep the value state as the empty string when the allowDuplicates prop is enabled', () => {
    const input = mount(<FileInput id="test" allowDuplicates />);
    expect(input.state('value')).toBe('');

    const file = new File();
    const event = { target: { files: [file], value: FAKE_FILE_PATH } };
    input.find('input').simulate('change', event);
    expect(input.state('value')).toBe('');

    input.setProps({ multiple: true });
    const event2 = { target: { files: [file, file], value: FAKE_FILE_PATH } };
    input.find('input').simulate('change', event2);
    expect(input.state('value')).toBe('');
  });
});
