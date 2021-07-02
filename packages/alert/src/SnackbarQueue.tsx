import React, {
  forwardRef,
  isValidElement,
  ReactElement,
  ReactNode,
  Ref,
} from "react";
import { Button, ButtonProps } from "@react-md/button";

import {
  ToastMessage,
  useMessageQueueActions,
  useMessageVisibility,
} from "./MessageQueueContext";
import { Snackbar, SnackbarProps } from "./Snackbar";
import { Toast } from "./Toast";

export type ActionEventHandler<M extends ToastMessage> = (
  message: M,
  event: React.MouseEvent<HTMLButtonElement>
) => void;

export interface SnackbarQueueProps<M extends ToastMessage>
  extends SnackbarProps {
  queue: M[];
  onActionClick?: ActionEventHandler<M>;
}

function getId(
  snackbarId: string,
  toastId: string | undefined,
  actionId: string | undefined
): string | undefined {
  if (actionId) {
    return actionId;
  }

  if (toastId) {
    return `${toastId}-action`;
  }

  return `${snackbarId}-action`;
}

/**
 * Because the toast renderer is a callback function instead of a React
 * component, it's actually required to create a separate component instance so
 * that the context API can be
 *
 * @internal
 */
function SnackbarQueueT<M extends ToastMessage = ToastMessage>(
  { queue, onActionClick, ...props }: SnackbarQueueProps<M>,
  ref?: Ref<HTMLDivElement>
): ReactElement {
  const [toast] = queue;
  const visible = useMessageVisibility();
  const { popMessage, hideMessage, startTimer } = useMessageQueueActions();

  let content = null;
  if (toast) {
    const snackbarId = props.id;
    const toastId = toast.id;
    const {
      messageId: _messageId,
      messagePriority: _messagePriority,
      disableAutohide = false,
      disableActionHide = false,
      action: providedAction,
      ...toastProps
    } = toast;

    let action: ReactNode = null;
    if (providedAction) {
      const actionProps = providedAction as ButtonProps;
      const onClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        if (onActionClick) {
          onActionClick(toast, event);
        }

        if (actionProps.onClick) {
          actionProps.onClick(event);
        }

        if (!disableActionHide) {
          hideMessage();
        }
      };

      const t = typeof providedAction;
      if (isValidElement(providedAction) || t !== "object") {
        action = (
          <Button
            id={getId(snackbarId, toastId, undefined)}
            onClick={onClick}
            theme="secondary"
          >
            {providedAction}
          </Button>
        );
      } else {
        action = (
          <Button
            id={getId(snackbarId, toastId, actionProps.id)}
            theme="secondary"
            {...actionProps}
            onClick={onClick}
          />
        );
      }
    }

    content = (
      <Toast
        {...toastProps}
        action={action}
        visible={visible}
        onEntered={disableAutohide ? undefined : startTimer}
        onExited={popMessage}
      />
    );
  }

  return (
    <Snackbar {...props} ref={ref}>
      {content}
    </Snackbar>
  );
}

export const SnackbarQueue = forwardRef<
  HTMLDivElement,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  SnackbarQueueProps<any>
>(SnackbarQueueT);
