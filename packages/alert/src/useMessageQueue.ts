import { Reducer, useCallback, useEffect, useReducer, useRef } from "react";
import { useTimeout, useToggle } from "@react-md/utils";

import {
  AddMessage,
  DEFAULT_MESSAGE_QUEUE_TIMEOUT,
  DuplicateBehavior,
  Message,
  MessageQueueActions,
  PopMessage,
  ResetQueue,
} from "./MessageQueueContext";
import useWindowBlurPause from "./useWindowBlurPause";

export const ADD_MESSAGE = "ADD_MESSAGE";
export const POP_MESSAGE = "POP_MESSAGE";
export const RESET_QUEUE = "RESET_QUEUE";

export interface AddMessageAction<M extends Message> {
  type: typeof ADD_MESSAGE;
  message: M;
  duplicates: DuplicateBehavior;
}

export interface PopMessageAction {
  type: typeof POP_MESSAGE;
}

export interface ResetQueueAction {
  type: typeof RESET_QUEUE;
}

export type MessageActions<M extends Message> =
  | AddMessageAction<M>
  | PopMessageAction
  | ResetQueueAction;

/**
 * This function is used to update the message queue state by adding a new message when
 * needed.
 *
 * @private
 */
export function addMessage<M extends Message = Message>(
  state: M[],
  message: M,
  duplicates: DuplicateBehavior
): M[] {
  if (state.length === 0) {
    return [message];
  }

  const { messageId, messagePriority = "normal" } = message;
  const i = state.findIndex(mes => mes.messageId === messageId);
  if (messagePriority === "next" || messagePriority === "immediate") {
    const nextState = state.slice();

    // remove the existing message if duplicated messages aren't allowed. This will
    // kind of act like a replace + next behavior
    if (duplicates !== "allow" && i > 1) {
      nextState.splice(i, 1);
    }

    const [current, ...remaining] = nextState;
    if (
      messagePriority === "immediate" &&
      current.messagePriority !== "immediate"
    ) {
      return [current, message, current, ...remaining];
    }

    return [current, message, ...remaining];
  }

  if (i === -1 || (messagePriority === "normal" && duplicates === "allow")) {
    return [...state, message];
  }

  if (messagePriority === "normal") {
    if (duplicates === "restart") {
      // creating a new state so that the queue visibility hook can still be triggered
      // which will restart the timer
      return state.slice();
    }

    return state;
  }

  if (messagePriority === "replace") {
    const nextState = state.slice();
    nextState[i] = message;
    return nextState;
  }

  return [...state, message];
}

type MessageQueueReducer<M extends Message> = Reducer<M[], MessageActions<M>>;

export function reducer<M extends Message>(
  state: M[],
  action: MessageActions<M>
): M[] {
  switch (action.type) {
    case ADD_MESSAGE:
      return addMessage(state, action.message, action.duplicates);
    case POP_MESSAGE:
      return state.slice(1);
    case RESET_QUEUE:
      return [];
    default:
      return state;
  }
}

export interface MessageQueueOptions<M extends Message> {
  timeout?: number;
  duplicates?: DuplicateBehavior;
  defaultQueue?: M[];
}

export interface MessageQueueResult<M extends Message>
  extends MessageQueueActions<M> {
  queue: M[];
  visible: boolean;
  addMessage: AddMessage<M>;
}

/**
 * This is the main logic for the message queue behavior that will handle:
 *
 * - creating timeouts as needed to show/hide toasts within the SnackbarQueue component
 * - create a way to push messages with optional priority onto the queue
 *
 * @private
 */
export default function useMessageQueue<M extends Message>({
  timeout = DEFAULT_MESSAGE_QUEUE_TIMEOUT,
  duplicates = "allow",
  defaultQueue = [],
}: MessageQueueOptions<M>): MessageQueueResult<M> {
  const [queue, dispatch] = useReducer<MessageQueueReducer<M>>(
    (state, action) => reducer<M>(state, action),
    defaultQueue
  );
  const queueRef = useRef(queue);

  const addMessageDispatch = useCallback<AddMessage<M>>(
    message => {
      if (duplicates !== "allow" && !message.messageId) {
        throw new Error(
          `A messageId is required when the "${duplicates}" duplicate behavior is enabled but it was not provided in the current message.`
        );
      }

      dispatch({ type: ADD_MESSAGE, message, duplicates });
    },
    [duplicates]
  );

  const popMessageDispatch = useCallback<PopMessage>(() => {
    dispatch({ type: POP_MESSAGE });
  }, []);

  const resetQueue = useCallback<ResetQueue<M>>(() => {
    dispatch({ type: RESET_QUEUE });
    return queueRef.current;
  }, []);
  const [visible, showMessage, hideMessage] = useToggle(
    defaultQueue.length > 0
  );
  const [startTimer, stopTimer, restartTimer] = useTimeout(
    hideMessage,
    timeout
  );

  useEffect(() => {
    // this effect will handle all the "logic" for transitioning between each message along with the
    // message priority updates.
    const [message, nextMessage] = queue;
    if (!message) {
      return;
    }

    const nextQueue = queueRef.current;
    const [prevMessage] = nextQueue;
    if (
      message.messagePriority !== "immediate" &&
      nextMessage &&
      nextMessage.messagePriority === "immediate"
    ) {
      stopTimer();
      if (!visible) {
        popMessageDispatch();
        return;
      }

      hideMessage();
      return;
    }

    if (!visible) {
      showMessage();
    }

    if (queue.length === nextQueue.length && message === prevMessage) {
      restartTimer();
    }

    // only want to run this on queue changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queue]);

  useWindowBlurPause({
    startTimer,
    stopTimer,
    visible,
    message: queue[0],
  });
  useEffect(() => {
    queueRef.current = queue;
  });

  return {
    queue,
    resetQueue,
    visible,
    hideMessage,
    addMessage: addMessageDispatch,
    popMessage: popMessageDispatch,
    startTimer,
    stopTimer,
    restartTimer,
  };
}
