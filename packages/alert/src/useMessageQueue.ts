import { useCallback, useEffect, useState, useRef } from "react";
import { useRefCache, useTimeout, useToggle } from "@react-md/utils";

import {
  AddMessage,
  DEFAULT_MESSAGE_QUEUE_TIMEOUT,
  DuplicateBehavior,
  Message,
  MessageQueueActions,
  ResetQueue,
} from "./MessageQueueContext";

export interface MessageQueueOptions<M extends Message> {
  timeout?: number;
  duplicates?: DuplicateBehavior;
  defaultQueue?: M[] | (() => M[]);
}

export interface MessageQueueResult<M extends Message>
  extends MessageQueueActions<M> {
  queue: M[];
  visible: boolean;
  addMessage: AddMessage<M>;
}

function addMessageWithPriority<M extends Message>(
  queue: M[],
  message: M
): M[] {
  if (queue.length === 0) {
    return [message];
  }

  const { messagePriority } = message;
  const [current, ...remaining] = queue;
  switch (messagePriority) {
    case "immediate":
      return [current, message, current, ...remaining];
    case "replace":
      return [message, ...remaining];
    case "next":
      return [current, message, ...remaining];
    default:
      return [...queue, message];
  }
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
}: MessageQueueOptions<M> = {}): MessageQueueResult<M> {
  const [queue, setCurrentQueue] = useState(defaultQueue);
  const prevQueue = useRef(queue);
  const [visible, showMessage, hideMessage] = useToggle(queue.length > 0);
  const [startTimer, stopTimer, restartTimer] = useTimeout(
    hideMessage,
    timeout
  );
  const cache = useRefCache({ queue, duplicates, stopTimer, startTimer });

  const addMessage = useCallback(
    (message: M) => {
      const { queue, duplicates } = cache.current;
      if (message.messagePriority === "immediate") {
        hideMessage();
      } else if (message.messagePriority === "replace") {
        if (message.disableAutohide) {
          stopTimer();
        } else {
          restartTimer();
        }
      }

      if (duplicates === "allow") {
        setCurrentQueue(addMessageWithPriority(queue, message));
        return;
      }

      if (typeof message.messageId === "undefined") {
        throw new Error(
          `A message id is required when the "${duplicates}" duplicate behavior is enabled but it did not exist`
        );
      }

      const i = queue.findIndex(
        ({ messageId }) => messageId === message.messageId
      );
      if (i === 0 && duplicates === "restart") {
        showMessage();
        restartTimer();
        return;
      }

      if (i === -1) {
        setCurrentQueue(addMessageWithPriority(queue, message));
      }
    },
    [cache, stopTimer, restartTimer, showMessage, hideMessage]
  );

  const popMessage = useCallback(() => {
    setCurrentQueue(([, ...nextQueue]) => nextQueue);
  }, []);

  const resetQueue = useCallback<ResetQueue<M>>(() => {
    const queue = cache.current.queue.slice();
    setCurrentQueue([]);
    return queue;
    // disabled since useRefCache
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const prev = prevQueue.current;
    if (
      queue.length > 0 &&
      !visible &&
      (prev.length === 0 || prev[0] !== queue[2])
    ) {
      showMessage();
    }
    // only want to update on queue changes to show the next message
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queue]);

  useEffect(() => {
    if (!visible || !queue[0] || queue[0].disableAutohide) {
      return;
    }

    const handleFocusEvent = (event: Event): void => {
      const { startTimer, stopTimer } = cache.current;
      if (event.type === "focus") {
        startTimer();
      } else {
        stopTimer();
      }
    };

    // if the user blurs the window while a toast is visible, we want to stop the timer
    // until the user re-focuses the window. if this behavior doesn't happen, a couple
    // of messages might go unnoticed
    window.addEventListener("blur", handleFocusEvent);
    window.addEventListener("focus", handleFocusEvent);
    return () => {
      window.removeEventListener("blur", handleFocusEvent);
      window.removeEventListener("focus", handleFocusEvent);
    };
    // disabled since useRefCache
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, queue]);
  useEffect(() => {
    prevQueue.current = queue;
  });

  return {
    queue,
    visible,
    hideMessage,
    startTimer,
    stopTimer,
    restartTimer,
    addMessage,
    popMessage,
    resetQueue,
  };
}
