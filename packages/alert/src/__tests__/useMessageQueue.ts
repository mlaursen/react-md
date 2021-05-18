import { Message, ToastMessage } from "../MessageQueueContext";
import {
  addMessage,
  AddMessageAction,
  ADD_MESSAGE,
  handleAddMessage,
  popMessage,
  POP_MESSAGE,
  reducer,
  resetQueue,
  RESET_QUEUE,
} from "../useMessageQueue";

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
  it("should create the correct action", () => {
    const message: Message = { messageId: "message-1" };
    expect(addMessage(message, "allow")).toEqual({
      type: ADD_MESSAGE,
      message: { messageId: "message-1" },
      duplicates: "allow",
    });
  });
});

describe("popMessage", () => {
  it("should create the correct action", () => {
    expect(popMessage()).toEqual({ type: POP_MESSAGE });
  });
});

describe("resetQueue", () => {
  it("should create the correct action", () => {
    expect(resetQueue()).toEqual({ type: RESET_QUEUE });
  });
});

describe("handleAddMessage", () => {
  it("should return a queue with only the new message if the queue was empty no matter what type of duplicate behavior or messagePriority is provided", () => {
    expect(handleAddMessage([], EMPTY_MESSAGE, "allow")).toEqual([
      EMPTY_MESSAGE,
    ]);
    expect(handleAddMessage([], NORMAL_MESSAGE, "allow")).toEqual([
      NORMAL_MESSAGE,
    ]);
    expect(handleAddMessage([], IMMEDIATE_MESSAGE, "allow")).toEqual([
      IMMEDIATE_MESSAGE,
    ]);
    expect(handleAddMessage([], REPLACE_MESSAGE, "allow")).toEqual([
      REPLACE_MESSAGE,
    ]);
    expect(handleAddMessage([], NEXT_MESSAGE, "allow")).toEqual([NEXT_MESSAGE]);

    expect(handleAddMessage([], EMPTY_MESSAGE, "prevent")).toEqual([
      EMPTY_MESSAGE,
    ]);
    expect(handleAddMessage([], NORMAL_MESSAGE, "prevent")).toEqual([
      NORMAL_MESSAGE,
    ]);
    expect(handleAddMessage([], IMMEDIATE_MESSAGE, "prevent")).toEqual([
      IMMEDIATE_MESSAGE,
    ]);
    expect(handleAddMessage([], REPLACE_MESSAGE, "prevent")).toEqual([
      REPLACE_MESSAGE,
    ]);
    expect(handleAddMessage([], NEXT_MESSAGE, "prevent")).toEqual([
      NEXT_MESSAGE,
    ]);

    expect(handleAddMessage([], EMPTY_MESSAGE, "restart")).toEqual([
      EMPTY_MESSAGE,
    ]);
    expect(handleAddMessage([], NORMAL_MESSAGE, "restart")).toEqual([
      NORMAL_MESSAGE,
    ]);
    expect(handleAddMessage([], IMMEDIATE_MESSAGE, "restart")).toEqual([
      IMMEDIATE_MESSAGE,
    ]);
    expect(handleAddMessage([], REPLACE_MESSAGE, "restart")).toEqual([
      REPLACE_MESSAGE,
    ]);
    expect(handleAddMessage([], NEXT_MESSAGE, "restart")).toEqual([
      NEXT_MESSAGE,
    ]);
  });

  describe("normal priority", () => {
    it("should default to messages being considered normal priority", () => {
      const message1: Message = {};
      const message2: Message = { messageId: "message-2" };
      expect(handleAddMessage([message1], message1, "allow")).toEqual([
        message1,
        message1,
      ]);
      expect(handleAddMessage([message1, message2], message1, "allow")).toEqual(
        [message1, message2, message1]
      );
    });

    it("should add all new messages to the end of the queue when duplicates are allowed", () => {
      const message1: Message = {};
      const message2: Message = { messageId: "message-2" };
      const message3: Message = { messageId: "message-3" };
      expect(handleAddMessage([message1, message2], message3, "allow")).toEqual(
        [message1, message2, message3]
      );
      expect(handleAddMessage([message1, message2], message1, "allow")).toEqual(
        [message1, message2, message1]
      );
      expect(handleAddMessage([message1], message1, "allow")).toEqual([
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
      expect(handleAddMessage(state1, message3, "prevent")).toEqual(expected1);
      expect(handleAddMessage(state1, message3, "restart")).toEqual(expected1);

      const state2 = [message1];
      const expected2 = [message1, message2];
      expect(handleAddMessage(state2, message2, "prevent")).toEqual(expected2);
      expect(handleAddMessage(state2, message2, "restart")).toEqual(expected2);
    });

    it("should return the existing state when duplicates are prevented and the message already exists in the state", () => {
      const message1: Message = { messageId: "message-1" };
      const message2: Message = { messageId: "message-2" };
      const message3: Message = { messageId: "message-3" };

      const state1 = [message1];
      expect(handleAddMessage(state1, message1, "prevent")).toBe(state1);
      const state2 = [message1, message2, message3];
      expect(handleAddMessage(state2, message2, "prevent")).toBe(state2);
    });

    it("should should return the existing state as a copied array when duplicates are restarted and the message already exists in the state so the restart flow can be triggered", () => {
      const message1: Message = { messageId: "message-1" };
      const message2: Message = { messageId: "message-2" };
      const message3: Message = { messageId: "message-3" };

      const state1 = [message1];
      expect(handleAddMessage(state1, message1, "restart")).not.toBe(state1);
      expect(handleAddMessage(state1, message1, "restart")).toEqual(state1);

      const state2 = [message1, message2, message3];
      expect(handleAddMessage(state2, message2, "restart")).not.toBe(state2);
      expect(handleAddMessage(state2, message2, "restart")).toEqual(state2);
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
      expect(handleAddMessage(state1, replacement, "allow")).toEqual(expected1);
      expect(handleAddMessage(state1, replacement, "prevent")).toEqual(
        expected1
      );
      expect(handleAddMessage(state1, replacement, "restart")).toEqual(
        expected1
      );

      const state2 = [message1];
      const expected2 = [message1, replacement];
      expect(handleAddMessage(state2, replacement, "allow")).toEqual(expected2);
      expect(handleAddMessage(state2, replacement, "prevent")).toEqual(
        expected2
      );
      expect(handleAddMessage(state2, replacement, "restart")).toEqual(
        expected2
      );
    });

    it("should replace the content of a message with the same id with the new message content by returning a new array", () => {
      const replacement: Message = {
        messageId: "message-3",
        messagePriority: "replace",
      };

      const state1 = [message3];
      const expected1 = [replacement];
      expect(handleAddMessage(state1, replacement, "allow")).toEqual(expected1);
      expect(handleAddMessage(state1, replacement, "prevent")).toEqual(
        expected1
      );
      expect(handleAddMessage(state1, replacement, "restart")).toEqual(
        expected1
      );
      expect(state1).toEqual([message3]);

      const state2 = [message3, message1];
      const expected2 = [replacement, message1];
      expect(handleAddMessage(state2, replacement, "allow")).toEqual(expected2);
      expect(handleAddMessage(state2, replacement, "prevent")).toEqual(
        expected2
      );
      expect(handleAddMessage(state2, replacement, "restart")).toEqual(
        expected2
      );
      expect(state2).toEqual([message3, message1]);

      const state3 = [message1, message3];
      const expected3 = [message1, replacement];
      expect(handleAddMessage(state3, replacement, "allow")).toEqual(expected3);
      expect(handleAddMessage(state3, replacement, "prevent")).toEqual(
        expected3
      );
      expect(handleAddMessage(state3, replacement, "restart")).toEqual(
        expected3
      );
      expect(state3).toEqual([message1, message3]);

      const state4 = [message2, message1, message3, message1];
      const expected4 = [message2, message1, replacement, message1];
      expect(handleAddMessage(state4, replacement, "allow")).toEqual(expected4);
      expect(handleAddMessage(state4, replacement, "prevent")).toEqual(
        expected4
      );
      expect(handleAddMessage(state4, replacement, "restart")).toEqual(
        expected4
      );
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
      expect(handleAddMessage(state1, next, "allow")).toEqual(expected1);
      expect(handleAddMessage(state1, next, "prevent")).toEqual(expected1);
      expect(handleAddMessage(state1, next, "restart")).toEqual(expected1);
      expect(state1).toEqual([message1]);

      const state2 = [message1, message2];
      const expected2 = [message1, next, message2];
      expect(handleAddMessage(state2, next, "allow")).toEqual(expected2);
      expect(handleAddMessage(state2, next, "prevent")).toEqual(expected2);
      expect(handleAddMessage(state2, next, "restart")).toEqual(expected2);
      expect(state2).toEqual([message1, message2]);

      const state3 = [message1, message2, message3];
      const expected3 = [message1, next, message2, message3];
      expect(handleAddMessage(state3, next, "allow")).toEqual(expected3);
      expect(handleAddMessage(state3, next, "prevent")).toEqual(expected3);
      expect(handleAddMessage(state3, next, "restart")).toEqual(expected3);
      expect(state3).toEqual([message1, message2, message3]);
    });

    it("should remove the old message if duplicates aren't allowed and the messageId is not the first message in the state", () => {
      const state1 = [message1];
      const next1: Message = { ...message1, messagePriority: "next" };

      expect(handleAddMessage(state1, next1, "prevent")).toEqual([
        message1,
        next1,
      ]);
      expect(handleAddMessage(state1, next1, "restart")).toEqual([
        message1,
        next1,
      ]);

      const state2 = [message1, message2];
      const next2: Message = { ...message2, messagePriority: "next" };
      expect(handleAddMessage(state2, next2, "prevent")).toEqual([
        message1,
        next2,
      ]);
      expect(handleAddMessage(state2, next2, "restart")).toEqual([
        message1,
        next2,
      ]);
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
      expect(handleAddMessage(state1, immediate, "allow")).toEqual(expected1);
      expect(handleAddMessage(state1, immediate, "prevent")).toEqual(expected1);
      expect(handleAddMessage(state1, immediate, "restart")).toEqual(expected1);
      expect(state1).toEqual([message1]);

      const state2 = [message1, message2];
      const expected2 = [message1, immediate, message1, message2];
      expect(handleAddMessage(state2, immediate, "allow")).toEqual(expected2);
      expect(handleAddMessage(state2, immediate, "prevent")).toEqual(expected2);
      expect(handleAddMessage(state2, immediate, "restart")).toEqual(expected2);
      expect(state2).toEqual([message1, message2]);

      const state3 = [message2, message1, message3];
      const expected3 = [message2, immediate, message2, message1, message3];
      expect(handleAddMessage(state3, immediate, "allow")).toEqual(expected3);
      expect(handleAddMessage(state3, immediate, "prevent")).toEqual(expected3);
      expect(handleAddMessage(state3, immediate, "restart")).toEqual(expected3);
      expect(state3).toEqual([message2, message1, message3]);
    });
  });
});

describe("reducer", () => {
  const message1: Message = { messageId: "message-1" };
  const message2: Message = { messageId: "message-2" };
  const message3: ToastMessage = { children: "Hello, world!" };

  it("should add a new messaage with the correct behavior for the ADD_MESSAGE action", () => {
    const action: AddMessageAction = {
      type: ADD_MESSAGE,
      message: message3,
      duplicates: "allow",
    };

    expect(reducer([], action)).toEqual([message3]);
    expect(reducer([message3], action)).toEqual([message3, message3]);
  });

  it("should not update the state if the POP_MESSAGE action is fired on an empty list", () => {
    const state: Message[] = [];

    expect(reducer(state, popMessage())).toBe(state);
  });

  it("should remove the first message in the queue after a POP_MESSAGE action", () => {
    expect(reducer([message1], popMessage())).toEqual([]);
    expect(reducer([message1, message2], popMessage())).toEqual([message2]);
  });

  it("should reset the queue after a RESET_QUEUE action", () => {
    expect(reducer([message1], resetQueue())).toEqual([]);
    expect(reducer([message1, message1], resetQueue())).toEqual([]);
    expect(
      reducer([message1, message2, message3, message1], resetQueue())
    ).toEqual([]);

    const state: Message[] = [];
    expect(reducer(state, resetQueue())).toBe(state);
  });
});
