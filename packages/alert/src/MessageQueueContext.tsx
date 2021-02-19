import { createContext, ReactNode, useContext } from "react";
import { ButtonProps } from "@react-md/button";

import { ToastProps } from "./Toast";

export const DEFAULT_MESSAGE_QUEUE_TIMEOUT = 5000;

export type DuplicateBehavior = "restart" | "prevent" | "allow";

export type MessagePriority = "normal" | "next" | "immediate" | "replace";

export interface Message {
  /**
   * If you have not enabled the prevent duplicated messages or the restart
   * message display timer functionality, this property can be omitted since it
   * is only used for those flows.
   *
   * When the `addMessage` action is called, the existing queue will be checked
   * for a message containing the new message's id. If it exists, it will not be
   * re-added to the queue. If the current message is being displayed, the
   * display timer will be restarted.
   */
  messageId?: string | number;

  /**
   * An optional priority to set to the message if this message needs to be
   * shown to the user more quickly. The default behavior will be to add it to
   * the end of the message queue, but when the priority is set to `"next"` it
   * will be shown immediately if there are no messages being displayed or
   * immediately after the current displayed message is hidden. All other
   * existing messages will maintain their order but pushed behind this new
   * message.
   *
   * @defaultValue `"normal"`
   */
  messagePriority?: MessagePriority;

  /**
   * Boolean if the message should not automatically hide itself after the
   * timeout duration.  This should normally be enabled if you want to enforce
   * the user presses the action inside or it is a toast that will be hidden by
   * some other logic (like online/offline).
   *
   * @defaultValue `false`
   */
  disableAutohide?: boolean;
}

export interface ToastMessage
  extends Message,
    Omit<ToastProps, "visible" | "action"> {
  /**
   * This can either be an object of button props to apply to a Button or a
   * ReactNode that will be rendered within a button.
   */
  action?: ButtonProps | ReactNode;

  /**
   * Boolean if the action button should not automatically hide the toast once
   * clicked.
   */
  disableActionHide?: boolean;
}

/**
 * This function is used to add a message to the queue.
 */
export type AddMessage<M extends Message> = (message: M) => void;

/**
 * @internal
 */
export const AddMessageContext = createContext<AddMessage<Message>>(() => {
  throw new Error(
    "Attempted to create a message without initializing the MessageQueue component."
  );
});

/**
 * @internal
 */
export const MessageVisibilityContext = createContext(false);

/**
 * This hook is used to add a message to the queue from anywhere in your app.
 * This should normally be used from click event handlers, but can also be
 * triggered with custom logic within components.
 */
export function useAddMessage<
  M extends Message = ToastMessage
>(): AddMessage<M> {
  return useContext(AddMessageContext);
}

/**
 * Gets the current message visibility to provide to the toast.
 *
 * @internal
 */
export function useMessageVisibility(): boolean {
  return useContext(MessageVisibilityContext);
}

/**
 * This function is used to immediately remove the current message from the
 * queue without an exit animation.
 */
export type PopMessage = () => void;

/**
 * This function is used to trigger the exit animation for the current message.
 * Once the animation finishes, the `PopMessage` function will be called to
 * remove it from the queue.
 */
export type HideMessage = () => void;

/**
 * This function will start the visibility timer for the current message. The
 * default behavior is to start the timer once the message finishes its' enter
 * animation. Once the timeout finished, the `HideMessage` function will be
 * called to start the exit animation.
 */
export type StartVisibilityTimer = () => void;

/**
 * This function will stop the visibility timer for the current message. This is
 * nice to use when the browser is blurred while a toast is visible and then
 * trigger the `RestartVisibilityTimer` once the focus is returned so that
 * toasts are not shown and hidden without the user being aware.
 */
export type StopVisibilityTimer = () => void;

/**
 * This function will restart the visibility timer. This is useful for handling
 * duplicate messages or browser focus loss/gain behavior.
 */
export type RestartVisibilityTimer = () => void;

/**
 * This will allow you to reset the entire queue and immediately hide all
 * notifications. This will return the current queue at the time of reset if you
 * would like to do some manual logic for adding items to the queue.
 */
export type ResetQueue<M extends Message> = () => M[];

/**
 * @internal
 */
export interface MessageQueueActions<M extends Message> {
  popMessage: PopMessage;
  hideMessage: HideMessage;
  startTimer: StartVisibilityTimer;
  stopTimer: StopVisibilityTimer;
  restartTimer: RestartVisibilityTimer;
  resetQueue: ResetQueue<M>;
}

/**
 * @internal
 */
export const MessageQueueActionsContext = createContext<
  MessageQueueActions<Message>
>({
  popMessage() {
    throw new Error(
      "Attempted to pop a message without initializing the MessageQueue component."
    );
  },
  hideMessage() {
    throw new Error(
      "Attempted to hide a message within initializing the MessageQueue component."
    );
  },
  startTimer() {
    throw new Error(
      "Attempted to start a message queue timer without initializing the MessageQueue component."
    );
  },
  stopTimer() {
    throw new Error(
      "Attempted to stop a message queue timer without initializing the MessageQueue component."
    );
  },
  restartTimer() {
    throw new Error(
      "Attempted to restart a message queue timer without initializing the MessageQueue component."
    );
  },
  resetQueue() {
    throw new Error(
      "Attempted to reset the message queue timer without initializing the MessageQueue component."
    );
  },
});

/**
 * This hook exposes some of the lower level actions for handling a message
 * queue if advanced behavior is desired.
 */
export function useMessageQueueActions<
  M extends Message
>(): MessageQueueActions<M> {
  // I don't know how to type the createContext for a generic
  return useContext(MessageQueueActionsContext) as MessageQueueActions<M>;
}

/**
 * @internal
 */
export const MessageQueueContext = createContext<Message[]>([]);

/**
 * This hook will allow you to get the current queue. This probably shouldn't be
 * used that much.
 */
export function useQueue<M extends Message>(): M[] {
  return useContext(MessageQueueContext) as M[];
}
