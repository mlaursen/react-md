/* eslint-env jest */
jest.mock('../../closest');

import handleKeyboardAccessibility from '../handleKeyboardAccessibility';
import closest from '../../closest';
import { ENTER, SPACE } from '../../../constants/keyCodes';

const preventDefault = jest.fn();
const FAKE_BUTTON = { getAttribute: jest.fn(() => 'button'), tagName: 'DIV' };

const FAKE_RADIO = { getAttribute: jest.fn(() => 'radio'), tagName: 'DIV' };

const FAKE_CHECKBOX = { getAttribute: jest.fn(() => 'checkbox'), tagName: 'DIV' };

describe('handleKeyboardAccessibility', () => {
  it('should trigger the onClick callback when listenToEnter is true and the enter key was pressed', () => {
    const event = { which: ENTER, keyCode: ENTER, target: FAKE_BUTTON, preventDefault };
    const onClick = jest.fn();
    handleKeyboardAccessibility(event, onClick, true, true);
    expect(onClick).toBeCalled();
  });

  it('should not trigger the onClick callback when listenToEnter is false and the enter key was pressed', () => {
    const event = { which: ENTER, keyCode: ENTER, target: FAKE_BUTTON, preventDefault };
    const onClick = jest.fn();
    handleKeyboardAccessibility(event, onClick, false, true);
    expect(onClick).not.toBeCalled();
  });

  it('should trigger the onClick callback when listenToEnter is true and the space key was pressed', () => {
    const event = { which: SPACE, keyCode: SPACE, target: FAKE_BUTTON, preventDefault };
    const onClick = jest.fn();
    handleKeyboardAccessibility(event, onClick, true, true);
    expect(onClick).toBeCalled();
  });

  it('should not trigger the onClick callback when listenToEnter is false and the space key was pressed', () => {
    const event = { which: SPACE, keyCode: SPACE, target: FAKE_BUTTON, preventDefault };
    const onClick = jest.fn();
    handleKeyboardAccessibility(event, onClick, true, false);
    expect(onClick).not.toBeCalled();
  });

  it('should not trigger the onClick callback if the role is a form element and the enter key was pressed', () => {
    const onClick = jest.fn();
    const event = { which: ENTER, keyCode: ENTER, target: FAKE_CHECKBOX, preventDefault };
    const event2 = { which: ENTER, keyCode: ENTER, target: FAKE_RADIO, preventDefault };

    handleKeyboardAccessibility(event, onClick, true, true);
    handleKeyboardAccessibility(event2, onClick, true, true);
    expect(onClick).not.toBeCalled();
  });

  it('should attempt to submit a form when the enter key is pressed and it is a form role', () => {
    const submit = { click: jest.fn() };
    const form = { querySelector: jest.fn(() => submit) };
    closest.mockImplementationOnce(() => form);

    const onClick = jest.fn();
    const event = { which: ENTER, keyCode: ENTER, target: FAKE_CHECKBOX, preventDefault };
    handleKeyboardAccessibility(event, onClick, true, true);

    expect(onClick).not.toBeCalled();
    expect(closest).toBeCalledWith(event.target, 'form');
    expect(form.querySelector).toBeCalledWith('*[type="submit"]');
    expect(submit.click).toBeCalled();
  });

  it('should not prevent the default behavior if the spacebar is pressed on an input, textarea, or button', () => {
    const cancelled = jest.fn();
    const button = { tagName: 'BUTTON', getAttribute: () => '' };
    const input = { tagName: 'INPUT', getAttribute: () => '' };
    const area = { tagName: 'TEXTAREA', getAttribute: () => '' };

    const onClick = jest.fn();
    const event1 = { which: SPACE, keyCode: SPACE, target: button, preventDefault: cancelled };
    const event2 = { which: SPACE, keyCode: SPACE, target: input, preventDefault: cancelled };
    const event3 = { which: SPACE, keyCode: SPACE, target: area, preventDefault: cancelled };

    handleKeyboardAccessibility(event1, onClick);
    handleKeyboardAccessibility(event2, onClick);
    handleKeyboardAccessibility(event3, onClick);
    expect(onClick.mock.calls.length).toBe(3);
  });
});
