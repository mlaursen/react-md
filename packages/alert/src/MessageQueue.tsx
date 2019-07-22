import React, { ReactElement, ReactNode, useMemo } from "react";

import {
  AddMessage,
  AddMessageContext,
  Message,
  MessageQueueActionsContext,
  MessageVisibilityContext,
  ToastMessage,
  MessageQueueContext,
} from "./MessageQueueContext";
import { SnackbarProps } from "./Snackbar";
import SnackbarQueue, { ActionEventHandler } from "./SnackbarQueue";
import { ToastProps } from "./Toast";
import useMessageQueue, { MessageQueueOptions } from "./useMessageQueue";

export interface MessageQueueProps<M extends ToastMessage>
  extends MessageQueueOptions<M>,
    SnackbarProps {
  /**
   * The children are required in this component since the message queue relies on setting
   * up React Context and provide hooks to add a message to the queue. If there are no
   * children, the message queue will not work.
   */
  children: ReactNode;

  /**
   * An optional function to call when the action button is clicked. This will be applied
   * to **all** toasts that appear in this message queue. You will be provided the current
   * message followed by the click event.
   */
  onActionClick?: ActionEventHandler<M>;
}

type DefaultProps<M extends ToastMessage> = Required<
  Pick<MessageQueueProps<M>, "timeout" | "duplicates" | "defaultQueue">
>;

type WithDefaultProps<M extends ToastMessage> = MessageQueueProps<M> &
  DefaultProps<M>;

/**
 * This component is used to be able to create a queue of messages with the `Snackbar` and
 * `Toast` components with a _fairly_ decent API out of the box.
 */
function MessageQueue<M extends ToastMessage = ToastMessage>(
  providedProps: MessageQueueProps<M>
): ReactElement | null {
  const {
    timeout,
    duplicates,
    defaultQueue,
    children,
    ...props
  } = providedProps as WithDefaultProps<M>;

  const {
    queue,
    visible,
    hideMessage,
    startTimer,
    stopTimer,
    restartTimer,
    addMessage,
    popMessage,
    resetQueue,
  } = useMessageQueue<M>({ timeout, duplicates, defaultQueue });
  const actions = useMemo(
    () => ({
      popMessage,
      hideMessage,
      startTimer,
      stopTimer,
      resetQueue,
      restartTimer,
    }),
    [popMessage, hideMessage, startTimer, stopTimer, restartTimer, resetQueue]
  );

  return (
    <AddMessageContext.Provider value={addMessage as AddMessage<Message>}>
      <MessageQueueActionsContext.Provider value={actions}>
        <MessageVisibilityContext.Provider value={visible}>
          <MessageQueueContext.Provider value={queue}>
            {children}
          </MessageQueueContext.Provider>
          <SnackbarQueue<M> {...props} queue={queue} />
        </MessageVisibilityContext.Provider>
      </MessageQueueActionsContext.Provider>
    </AddMessageContext.Provider>
  );
}

const defaultProps: DefaultProps<Message & ToastProps> = {
  timeout: 5000,
  duplicates: "allow",
  defaultQueue: [],
};

MessageQueue.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  let PropTypes;

  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    MessageQueue.propTypes = {
      timeout: PropTypes.number,
      duplicates: PropTypes.oneOf(["allow", "restart", "prevent"]),
      defaultQueue: PropTypes.array,
      onActionClick: PropTypes.func,
      children: PropTypes.node.isRequired,
    };
  }
}

export default MessageQueue;
