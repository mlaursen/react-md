/* eslint-env jest, jasmine*/
/* eslint-disable max-len */
jest.unmock('../FileUpload');
jest.unmock('../FileInput');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  Simulate,
  renderIntoDocument,
  findRenderedDOMComponentWithTag,
} from 'react-addons-test-utils';

import FileUpload from '../FileUpload';

const File = jest.fn((size, type) => ({
  name: 'Test.jpg',
  lastModifiedDate: new Date(),
  isClosed: true,
  size: size || 1024,
  type: typeof type === 'string' ? type : 'image/jpg',
}));

describe('FileUpload', () => {
  it('merges className and style', () => {
    const style = { display: 'block' };
    const className = 'test';
    const fileUpload = renderIntoDocument(
      <FileUpload id="test" style={style} className={className} onChange={jest.fn()} />
    );

    const fileUploadNode = findDOMNode(fileUpload);
    expect(fileUploadNode.style.display).toBe(style.display);
    expect(fileUploadNode.className).toContain(className);
  });

  it('calls the onChange function still', () => {
    const onChange = jest.fn();
    const fileUpload = renderIntoDocument(<FileUpload id="test" onChange={onChange} />);

    const input = findRenderedDOMComponentWithTag(fileUpload, 'input');
    const files = [new File()];

    Simulate.change(input, { target: { files } });
    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][0]).toEqual(files[0]);
  });

  it('prevents any files with a size greater than the maxSize', () => {
    const onSizeError = jest.fn();
    const fileUpload = renderIntoDocument(<FileUpload id="test" maxSize={1024} onSizeError={onSizeError} />);

    const input = findRenderedDOMComponentWithTag(fileUpload, 'input');
    let files = [new File()];

    Simulate.change(input, { target: { files } });
    expect(onSizeError.mock.calls.length).toBe(0);

    files = [new File(1025)];

    Simulate.change(input, { target: { files } });
    expect(onSizeError.mock.calls.length).toBe(1);
    expect(onSizeError.mock.calls[0][0]).toEqual(files);
  });

  it('calls the onError prop with the current file, error, and error event', () => {
    const eventListener = jasmine.createSpy();

    const frMock = {
      onerror: jest.fn(e => e),
      readAsDataURL: jest.fn(function read() {
        this.onerror({ target: { error: new Error('Something went wrong') } });
      }),
      addEventListener: eventListener,
    };

    spyOn(window, 'FileReader').and.returnValue(frMock);

    const onError = jest.fn();
    const fileUpload = renderIntoDocument(<FileUpload id="test" onError={onError} />);
    const input = findRenderedDOMComponentWithTag(fileUpload, 'input');
    const files = [new File()];

    Simulate.change(input, { target: { files } });
    expect(onError.mock.calls.length).toBe(1);
    expect(onError.mock.calls[0][0]).toEqual(files[0]);
    expect(onError.mock.calls[0][1]).toEqual(new Error('Something went wrong'));
    expect(onError.mock.calls[0][2]).toBeDefined();
  });

  it('calls the onAbort prop with the current file and the abort event', () => {
    const eventListener = jasmine.createSpy();

    const frMock = {
      onabort: jest.fn(e => e),
      readAsDataURL: jest.fn(function abort() {
        this.onabort({});
      }),
      addEventListener: eventListener,
    };

    spyOn(window, 'FileReader').and.returnValue(frMock);

    const onAbort = jest.fn();
    const fileUpload = renderIntoDocument(<FileUpload id="test" onAbort={onAbort} />);
    const input = findRenderedDOMComponentWithTag(fileUpload, 'input');
    const files = [new File()];

    Simulate.change(input, { target: { files } });
    expect(onAbort.mock.calls.length).toBe(1);
    expect(onAbort.mock.calls[0][0]).toEqual(files[0]);
    expect(onAbort.mock.calls[0][1]).toBeDefined();
  });

  it('calls the onLoadStart prop with the current file and the load start event', () => {
    const eventListener = jasmine.createSpy();

    const frMock = {
      onloadstart: jest.fn(e => e),
      readAsDataURL: jest.fn(function loadStart() {
        this.onloadstart({});
      }),
      addEventListener: eventListener,
    };

    spyOn(window, 'FileReader').and.returnValue(frMock);

    const onLoadStart = jest.fn();
    const fileUpload = renderIntoDocument(<FileUpload id="test" onLoadStart={onLoadStart} />);
    const input = findRenderedDOMComponentWithTag(fileUpload, 'input');
    const files = [new File()];

    Simulate.change(input, { target: { files } });
    expect(onLoadStart.mock.calls.length).toBe(1);
    expect(onLoadStart.mock.calls[0][0]).toEqual(files[0]);
    expect(onLoadStart.mock.calls[0][1]).toBeDefined();
  });

  it('calls the onLoadEnd prop with the current file and the load end event', () => {
    const eventListener = jasmine.createSpy();

    const frMock = {
      onloadend: jest.fn(e => e),
      readAsDataURL: jest.fn(function loadEnd() {
        this.onloadend({});
      }),
      addEventListener: eventListener,
    };

    spyOn(window, 'FileReader').and.returnValue(frMock);

    const onLoadEnd = jest.fn();
    const fileUpload = renderIntoDocument(<FileUpload id="test" onLoadEnd={onLoadEnd} />);
    const input = findRenderedDOMComponentWithTag(fileUpload, 'input');
    const files = [new File()];

    Simulate.change(input, { target: { files } });
    expect(onLoadEnd.mock.calls.length).toBe(1);
    expect(onLoadEnd.mock.calls[0][0]).toEqual(files[0]);
    expect(onLoadEnd.mock.calls[0][1]).toBeDefined();
  });

  it('calls the onLoad function with the file, the load result, and the load event', () => {
    const eventListener = jasmine.createSpy();

    const result = 'data:image/png;base64;hfuasdhfjawf';
    const frMock = {
      onload: jest.fn(e => e),
      readAsDataURL: jest.fn(function load() {
        this.onload(({ target: { result } }));
      }),
      addEventListener: eventListener,
    };

    spyOn(window, 'FileReader').and.returnValue(frMock);

    const onLoad = jest.fn();
    const fileUpload = renderIntoDocument(<FileUpload id="test" onLoad={onLoad} />);
    const input = findRenderedDOMComponentWithTag(fileUpload, 'input');
    const files = [new File()];

    Simulate.change(input, { target: { files } });
    expect(onLoad.mock.calls.length).toBe(1);
    expect(onLoad.mock.calls[0][0]).toBe(files[0]);
    expect(onLoad.mock.calls[0][1]).toBe(result);
    expect(onLoad.mock.calls[0][2]).toBeDefined();
  });

  it('calls the onProgress function with the file, percentage complete, and the progress event', () => {
    const eventListener = jasmine.createSpy();

    const frMock = {
      onprogress: jest.fn(e => e),
      readAsDataURL: jest.fn(function progress(file) {
        this.onprogress(({ lengthComputable: true, loaded: 22, total: file.size }));
      }),
      addEventListener: eventListener,
    };

    spyOn(window, 'FileReader').and.returnValue(frMock);

    const onProgress = jest.fn();
    const fileUpload = renderIntoDocument(<FileUpload id="test" onProgress={onProgress} />);
    const input = findRenderedDOMComponentWithTag(fileUpload, 'input');
    const files = [new File()];

    Simulate.change(input, { target: { files } });
    expect(onProgress.mock.calls.length).toBe(1);
    expect(onProgress.mock.calls[0][0]).toBe(files[0]);
    expect(onProgress.mock.calls[0][1]).toBe((22 / files[0].size) * 100);
    expect(onProgress.mock.calls[0][2]).toBeDefined();
  });

  it('it matches image, video, and audio to the readAsDataURL FileReader function', () => {
    const eventListener = jasmine.createSpy();

    const frMock = {
      readAsDataURL: jest.fn(),
      readAsArrayBuffer: jest.fn(),
      readAsText: jest.fn(),
      addEventListener: eventListener,
    };
    spyOn(window, 'FileReader').and.returnValue(frMock);

    const fileUpload = renderIntoDocument(<FileUpload id="test" />);
    const input = findRenderedDOMComponentWithTag(fileUpload, 'input');
    let files = [new File()];

    Simulate.change(input, { target: { files } });

    expect(frMock.readAsDataURL.mock.calls.length).toBe(1);
    expect(frMock.readAsArrayBuffer.mock.calls.length).toBe(0);
    expect(frMock.readAsText.mock.calls.length).toBe(0);

    files = [new File(1024, 'video/mp4')];

    Simulate.change(input, { target: { files } });

    expect(frMock.readAsDataURL.mock.calls.length).toBe(2);
    expect(frMock.readAsArrayBuffer.mock.calls.length).toBe(0);
    expect(frMock.readAsText.mock.calls.length).toBe(0);

    files = [new File(1024, 'audio/mp3')];

    Simulate.change(input, { target: { files } });

    expect(frMock.readAsDataURL.mock.calls.length).toBe(3);
    expect(frMock.readAsArrayBuffer.mock.calls.length).toBe(0);
    expect(frMock.readAsText.mock.calls.length).toBe(0);
  });

  it('matches application, model, and multipart to the readAsArrayBuffer FileReader function', () => {
    const eventListener = jasmine.createSpy();

    const frMock = {
      readAsDataURL: jest.fn(),
      readAsArrayBuffer: jest.fn(),
      readAsText: jest.fn(),
      addEventListener: eventListener,
    };
    spyOn(window, 'FileReader').and.returnValue(frMock);

    const fileUpload = renderIntoDocument(<FileUpload id="test" />);
    const input = findRenderedDOMComponentWithTag(fileUpload, 'input');
    let files = [new File(1024, 'application/gzip')];

    Simulate.change(input, { target: { files } });

    expect(frMock.readAsDataURL.mock.calls.length).toBe(0);
    expect(frMock.readAsArrayBuffer.mock.calls.length).toBe(1);
    expect(frMock.readAsText.mock.calls.length).toBe(0);

    // no idea what real model would be
    files = [new File(1024, 'model/airoplaine')];

    Simulate.change(input, { target: { files } });

    expect(frMock.readAsDataURL.mock.calls.length).toBe(0);
    expect(frMock.readAsArrayBuffer.mock.calls.length).toBe(2);
    expect(frMock.readAsText.mock.calls.length).toBe(0);

    // not sure what real multipart would be.
    files = [new File(1024, 'multipart/form-data')];

    Simulate.change(input, { target: { files } });

    expect(frMock.readAsDataURL.mock.calls.length).toBe(0);
    expect(frMock.readAsArrayBuffer.mock.calls.length).toBe(3);
    expect(frMock.readAsText.mock.calls.length).toBe(0);
  });

  it('matches any remaining type to text', () => {
    const eventListener = jasmine.createSpy();

    const frMock = {
      readAsDataURL: jest.fn(),
      readAsArrayBuffer: jest.fn(),
      readAsText: jest.fn(),
      addEventListener: eventListener,
    };
    spyOn(window, 'FileReader').and.returnValue(frMock);

    const fileUpload = renderIntoDocument(<FileUpload id="test" />);
    const input = findRenderedDOMComponentWithTag(fileUpload, 'input');
    let files = [new File(1024, 'text/x-java')];

    Simulate.change(input, { target: { files } });

    expect(frMock.readAsDataURL.mock.calls.length).toBe(0);
    expect(frMock.readAsArrayBuffer.mock.calls.length).toBe(0);
    expect(frMock.readAsText.mock.calls.length).toBe(1);

    files = [new File(1024, '')];

    Simulate.change(input, { target: { files } });

    expect(frMock.readAsDataURL.mock.calls.length).toBe(0);
    expect(frMock.readAsArrayBuffer.mock.calls.length).toBe(0);
    expect(frMock.readAsText.mock.calls.length).toBe(2);
  });

  it('allows for a custom readAs string', () => {
    const eventListener = jasmine.createSpy();

    const frMock = {
      readAsDataURL: jest.fn(),
      readAsArrayBuffer: jest.fn(),
      readAsText: jest.fn(),
      addEventListener: eventListener,
    };
    spyOn(window, 'FileReader').and.returnValue(frMock);

    let fileUpload = renderIntoDocument(<FileUpload id="test" readAs="DataURL" />);
    let input = findRenderedDOMComponentWithTag(fileUpload, 'input');
    const files = [new File(2024, 'application/javascript')];

    Simulate.change(input, { target: { files } });
    expect(frMock.readAsDataURL.mock.calls.length).toBe(1);
    expect(frMock.readAsArrayBuffer.mock.calls.length).toBe(0);
    expect(frMock.readAsText.mock.calls.length).toBe(0);

    fileUpload = renderIntoDocument(<FileUpload id="test" readAs="ArrayBuffer" />);
    input = findRenderedDOMComponentWithTag(fileUpload, 'input');

    Simulate.change(input, { target: { files } });
    expect(frMock.readAsDataURL.mock.calls.length).toBe(1);
    expect(frMock.readAsArrayBuffer.mock.calls.length).toBe(1);
    expect(frMock.readAsText.mock.calls.length).toBe(0);

    fileUpload = renderIntoDocument(<FileUpload id="test" readAs="Text" />);
    input = findRenderedDOMComponentWithTag(fileUpload, 'input');

    Simulate.change(input, { target: { files } });
    expect(frMock.readAsDataURL.mock.calls.length).toBe(1);
    expect(frMock.readAsArrayBuffer.mock.calls.length).toBe(1);
    expect(frMock.readAsText.mock.calls.length).toBe(1);
  });

  it('allows for a custom readAs function that accepts the file type, the file, and the current file reader', () => {
    const eventListener = jasmine.createSpy();

    const frMock = {
      readAsDataURL: jest.fn(),
      readAsArrayBuffer: jest.fn(),
      readAsText: jest.fn(),
      addEventListener: eventListener,
    };
    spyOn(window, 'FileReader').and.returnValue(frMock);

    const readAs = jest.fn();
    const fileUpload = renderIntoDocument(<FileUpload id="test" readAs={readAs} />);
    const input = findRenderedDOMComponentWithTag(fileUpload, 'input');
    const files = [new File()];

    Simulate.change(input, { target: { files } });
    expect(readAs.mock.calls.length).toBe(1);
    expect(readAs.mock.calls[0][0]).toBe(files[0].type);
    expect(readAs.mock.calls[0][1]).toEqual(files[0]);
    expect(readAs.mock.calls[0][2]).toEqual(frMock);
  });
});
