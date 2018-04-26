/* eslint-env jest */

import reducer, {
  CREATE_MESSAGE,
  REMOVE_MESSAGE,
  createMessage,
  removeMessage,
} from '../messages';

describe('messages', () => {
  describe('action creators', () => {
    describe('createMessage', () => {
      it('should create the correct action', () => {
        const message = { text: 'Hello, World!' };
        const message2 = { text: 'Hello, World!', action: () => {} };

        const expected = {
          type: CREATE_MESSAGE,
          payload: { message },
        };
        const expected2 = {
          type: CREATE_MESSAGE,
          payload: { message: message2 },
        };

        expect(createMessage(message)).toEqual(expected);
        expect(createMessage(message2)).toEqual(expected2);
      });

      it('should convert a text based message into an object', () => {
        const message = 'This is a string based only message.';
        const expected = {
          type: CREATE_MESSAGE,
          payload: { message: { text: message } },
        };

        expect(createMessage(message)).toEqual(expected);
      });
    });

    describe('removeMessage', () => {
      it('should create the correct action', () => {
        expect(removeMessage()).toEqual({ type: REMOVE_MESSAGE });
      });
    });
  });

  describe('reducer', () => {
    it('should default to the empty list', () => {
      expect(reducer(undefined, {})).toEqual([]);
    });

    it('should add a new message to the state after a CREATE_MESSAGE action', () => {
      const state = [];
      const message = { text: 'Hello, World!' };
      const expected = [message];

      expect(reducer(state, createMessage(message))).toEqual(expected);
    });

    it('should correctly add the new message to the end of the list', () => {
      const defaultMessage = { text: 'Woop woop' };
      const state = [defaultMessage];
      const message = { text: 'Hello, World!' };
      const expected = [defaultMessage, message];

      expect(reducer(state, createMessage(message))).toEqual(expected);
    });

    it('should return the state if there is no length after a REMOVE_MESSAGE action', () => {
      const state = [];
      expect(reducer(state, removeMessage())).toBe(state);
    });

    it('should remove the first item from the list after the REMOVE_MESSAGE action', () => {
      const state = [{ text: 'Hello, World!' }];
      expect(reducer(state, removeMessage())).toEqual([]);
    });

    it('should leave any other messages in the state afte rthe first message was removed', () => {
      const message = { text: 'This should remain' };
      const state = [{ text: 'Hello, World!' }, message];
      const expected = [message];

      expect(reducer(state, removeMessage())).toEqual(expected);
    });
  });
});
