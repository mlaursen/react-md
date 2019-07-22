// import { cleanup } from "@testing-library/react";
// import { renderHook } from "@testing-library/react-hooks";

import { addMessage } from "../useMessageQueue";

import { Message } from "../MessageQueueContext";

const EMPTY_MESSAGE: Message = {};
const NORMAL_MESSAGE: Message = {
  messageId: "message-2",
  messagePriority: "normal",
};
const IMMEDIATE_MESSAGE: Message = {
  messageId: "message-3",
  messagePriority: "immediate",
};
const REPLACE_MESSAGE: Message = {
  messageId: "message-4",
  messagePriority: "replace",
};
const NEXT_MESSAGE: Message = {
  messageId: "message-5",
  messagePriority: "next",
};

describe("addMessage", () => {
  it("should areturn a queue with only the new message if the queue was empty no matter what type of duplicate behavior or messagePriority is provided", () => {
    expect(addMessage([], EMPTY_MESSAGE, "allow")).toEqual([EMPTY_MESSAGE]);
    expect(addMessage([], NORMAL_MESSAGE, "allow")).toEqual([NORMAL_MESSAGE]);
    expect(addMessage([], IMMEDIATE_MESSAGE, "allow")).toEqual([
      IMMEDIATE_MESSAGE,
    ]);
    expect(addMessage([], REPLACE_MESSAGE, "allow")).toEqual([REPLACE_MESSAGE]);
    expect(addMessage([], NEXT_MESSAGE, "allow")).toEqual([NEXT_MESSAGE]);

    expect(addMessage([], EMPTY_MESSAGE, "prevent")).toEqual([EMPTY_MESSAGE]);
    expect(addMessage([], NORMAL_MESSAGE, "prevent")).toEqual([NORMAL_MESSAGE]);
    expect(addMessage([], IMMEDIATE_MESSAGE, "prevent")).toEqual([
      IMMEDIATE_MESSAGE,
    ]);
    expect(addMessage([], REPLACE_MESSAGE, "prevent")).toEqual([
      REPLACE_MESSAGE,
    ]);
    expect(addMessage([], NEXT_MESSAGE, "prevent")).toEqual([NEXT_MESSAGE]);

    expect(addMessage([], EMPTY_MESSAGE, "restart")).toEqual([EMPTY_MESSAGE]);
    expect(addMessage([], NORMAL_MESSAGE, "restart")).toEqual([NORMAL_MESSAGE]);
    expect(addMessage([], IMMEDIATE_MESSAGE, "restart")).toEqual([
      IMMEDIATE_MESSAGE,
    ]);
    expect(addMessage([], REPLACE_MESSAGE, "restart")).toEqual([
      REPLACE_MESSAGE,
    ]);
    expect(addMessage([], NEXT_MESSAGE, "restart")).toEqual([NEXT_MESSAGE]);
  });

  describe("normal priority", () => {
    it("should default to messages being considered normal priority", () => {
      const message1: Message = {};
      const message2: Message = { messageId: "message-2" };
      expect(addMessage([message1], message1, "allow")).toEqual([
        message1,
        message1,
      ]);
      expect(addMessage([message1, message2], message1, "allow")).toEqual([
        message1,
        message2,
        message1,
      ]);
    });

    it("should add all new messages to the end of the queue when duplicates are allowed", () => {
      const message1: Message = {};
      const message2: Message = { messageId: "message-2" };
      const message3: Message = { messageId: "message-3" };
      expect(addMessage([message1, message2], message3, "allow")).toEqual([
        message1,
        message2,
        message3,
      ]);
      expect(addMessage([message1, message2], message1, "allow")).toEqual([
        message1,
        message2,
        message1,
      ]);
      expect(addMessage([message1], message1, "allow")).toEqual([
        message1,
        message1,
      ]);
    });

    it("should add the message to the end of the queue if the message does not already exist in the state when duplicates are prevented or restarted", () => {
      const message1: Message = { messageId: "message-1" };
      const message2: Message = { messageId: "message-2" };
      const message3: Message = { messageId: "message-3" };

      const state1 = [message1, message2];
      const expected1 = [message1, message2, message3];
      expect(addMessage(state1, message3, "prevent")).toEqual(expected1);
      expect(addMessage(state1, message3, "restart")).toEqual(expected1);

      const state2 = [message1];
      const expected2 = [message1, message2];
      expect(addMessage(state2, message2, "prevent")).toEqual(expected2);
      expect(addMessage(state2, message2, "restart")).toEqual(expected2);
    });

    it("should return the existing state when duplicates are prevented and the message already exists in the state", () => {
      const message1: Message = { messageId: "message-1" };
      const message2: Message = { messageId: "message-2" };
      const message3: Message = { messageId: "message-3" };

      const state1 = [message1];
      expect(addMessage(state1, message1, "prevent")).toBe(state1);
      const state2 = [message1, message2, message3];
      expect(addMessage(state2, message2, "prevent")).toBe(state2);
    });

    it("should should return the existing state as a copied array when duplicates are restarted and the message already exists in the state so the restart flow can be triggered", () => {
      const message1: Message = { messageId: "message-1" };
      const message2: Message = { messageId: "message-2" };
      const message3: Message = { messageId: "message-3" };

      const state1 = [message1];
      expect(addMessage(state1, message1, "restart")).not.toBe(state1);
      expect(addMessage(state1, message1, "restart")).toEqual(state1);

      const state2 = [message1, message2, message3];
      expect(addMessage(state2, message2, "restart")).not.toBe(state2);
      expect(addMessage(state2, message2, "restart")).toEqual(state2);
    });
  });

  describe("replace priority", () => {
    const message1: Message = { messageId: "message-1" };
    const message2: Message = { messageId: "message-2" };
    const message3: Message = { messageId: "message-3" };

    it("should add the new message to the end of the queue if there are no existing messages with the same id", () => {
      const replacement: Message = {
        messageId: "mesage-3",
        messagePriority: "replace",
      };

      const state1 = [message1, message2];
      const expected1 = [message1, message2, replacement];
      expect(addMessage(state1, replacement, "allow")).toEqual(expected1);
      expect(addMessage(state1, replacement, "prevent")).toEqual(expected1);
      expect(addMessage(state1, replacement, "restart")).toEqual(expected1);

      const state2 = [message1];
      const expected2 = [message1, replacement];
      expect(addMessage(state2, replacement, "allow")).toEqual(expected2);
      expect(addMessage(state2, replacement, "prevent")).toEqual(expected2);
      expect(addMessage(state2, replacement, "restart")).toEqual(expected2);
    });

    it("should replace the content of a message with the same id with the new message content by returning a new array", () => {
      const replacement: Message = {
        messageId: "message-3",
        messagePriority: "replace",
      };

      const state1 = [message3];
      const expected1 = [replacement];
      expect(addMessage(state1, replacement, "allow")).toEqual(expected1);
      expect(addMessage(state1, replacement, "prevent")).toEqual(expected1);
      expect(addMessage(state1, replacement, "restart")).toEqual(expected1);
      expect(state1).toEqual([message3]);

      const state2 = [message3, message1];
      const expected2 = [replacement, message1];
      expect(addMessage(state2, replacement, "allow")).toEqual(expected2);
      expect(addMessage(state2, replacement, "prevent")).toEqual(expected2);
      expect(addMessage(state2, replacement, "restart")).toEqual(expected2);
      expect(state2).toEqual([message3, message1]);

      const state3 = [message1, message3];
      const expected3 = [message1, replacement];
      expect(addMessage(state3, replacement, "allow")).toEqual(expected3);
      expect(addMessage(state3, replacement, "prevent")).toEqual(expected3);
      expect(addMessage(state3, replacement, "restart")).toEqual(expected3);
      expect(state3).toEqual([message1, message3]);

      const state4 = [message2, message1, message3, message1];
      const expected4 = [message2, message1, replacement, message1];
      expect(addMessage(state4, replacement, "allow")).toEqual(expected4);
      expect(addMessage(state4, replacement, "prevent")).toEqual(expected4);
      expect(addMessage(state4, replacement, "restart")).toEqual(expected4);
      expect(state4).toEqual([message2, message1, message3, message1]);
    });
  });

  describe("next priority", () => {
    const message1: Message = { messageId: "message-1" };
    const message2: Message = { messageId: "message-2" };
    const message3: Message = { messageId: "message-3" };

    it("should set the message at index 1 for all duplicate behaviors if it doesn't exist in the state", () => {
      const next: Message = {
        messageId: "next-message",
        messagePriority: "next",
      };

      const state1 = [message1];
      const expected1 = [message1, next];
      expect(addMessage(state1, next, "allow")).toEqual(expected1);
      expect(addMessage(state1, next, "prevent")).toEqual(expected1);
      expect(addMessage(state1, next, "restart")).toEqual(expected1);
      expect(state1).toEqual([message1]);

      const state2 = [message1, message2];
      const expected2 = [message1, next, message2];
      expect(addMessage(state2, next, "allow")).toEqual(expected2);
      expect(addMessage(state2, next, "prevent")).toEqual(expected2);
      expect(addMessage(state2, next, "restart")).toEqual(expected2);
      expect(state2).toEqual([message1, message2]);

      const state3 = [message1, message2, message3];
      const expected3 = [message1, next, message2, message3];
      expect(addMessage(state3, next, "allow")).toEqual(expected3);
      expect(addMessage(state3, next, "prevent")).toEqual(expected3);
      expect(addMessage(state3, next, "restart")).toEqual(expected3);
      expect(state3).toEqual([message1, message2, message3]);
    });
  });

  describe("immediate pirority", () => {
    const message1: Message = { messageId: "message-1" };
    const message2: Message = { messageId: "message-2" };
    const message3: Message = { messageId: "message-3" };

    it("should set the message at index 1 for all duplicate behaviors if it doesn't exist in the state as well as duplicate the current visible message at index 2 so it can be re-shown", () => {
      const immediate: Message = {
        messageId: "next-message",
        messagePriority: "immediate",
      };

      const state1 = [message1];
      const expected1 = [message1, immediate, message1];
      expect(addMessage(state1, immediate, "allow")).toEqual(expected1);
      expect(addMessage(state1, immediate, "prevent")).toEqual(expected1);
      expect(addMessage(state1, immediate, "restart")).toEqual(expected1);
      expect(state1).toEqual([message1]);

      const state2 = [message1, message2];
      const expected2 = [message1, immediate, message1, message2];
      expect(addMessage(state2, immediate, "allow")).toEqual(expected2);
      expect(addMessage(state2, immediate, "prevent")).toEqual(expected2);
      expect(addMessage(state2, immediate, "restart")).toEqual(expected2);
      expect(state2).toEqual([message1, message2]);

      const state3 = [message2, message1, message3];
      const expected3 = [message2, immediate, message2, message1, message3];
      expect(addMessage(state3, immediate, "allow")).toEqual(expected3);
      expect(addMessage(state3, immediate, "prevent")).toEqual(expected3);
      expect(addMessage(state3, immediate, "restart")).toEqual(expected3);
      expect(state3).toEqual([message2, message1, message3]);
    });
  });
});

// afterEach(cleanup);

// describe("useMessageQueue", () => {
//   it("should return the correct default queue", () => {
//     const { result } = renderHook(() => useMessageQueue({}));
//   });
// });
