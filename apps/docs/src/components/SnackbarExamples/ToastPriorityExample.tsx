import type { ToastPriority } from "@react-md/core";
import {
  Box,
  Form,
  Radio,
  Snackbar,
  useRadioGroup,
  useToastManager,
  useToastQueue,
  wait,
} from "@react-md/core";
import type { ReactElement } from "react";
import { AsyncButton } from "../AsyncButton";
import { CodeBlock } from "../Code";
import styles from "./ToastPriorityExample.module.scss";

export function ToastPriorityExample(): ReactElement {
  const { addToast, removeToast } = useToastManager();
  const queue = useToastQueue();
  const { value, getRadioProps } = useRadioGroup<ToastPriority>({
    name: "toastFlow",
    defaultValue: "immediate",
  });

  const addNextFlow = async (): Promise<void> => {
    addToast({ children: "Hello, world! (1)" });
    addToast({ children: "Hello, world! (2)" });

    await wait(3000);
    addToast({
      theme: "error",
      toastId: "500",
      children: "Internal Server Error",
      priority: "next",
    });
  };

  const addImmediateOrReplace = async (replace: boolean): Promise<void> => {
    const priority = replace ? "replace" : "immediate";
    await wait(2000);
    addToast({
      toastId: "offline",
      children: "Offline",
      theme: "error",
      priority,
      visibleTime: null,
      closeButton: false,
    });
    addToast({
      theme: "error",
      toastId: "500",
      children: "Internal Server Error",
    });
    addToast({
      theme: "error",
      toastId: "500",
      children: "Internal Server Error",
    });
    addToast({
      theme: "error",
      toastId: "500",
      children: "Internal Server Error",
    });

    await wait(8000);
    removeToast("offline", true);
  };

  return (
    <Form className={styles.form}>
      <Box stacked align="flex-start">
        <Radio {...getRadioProps("next")} label="Next" />
        <Radio {...getRadioProps("replace")} label="Replace" />
        <Radio {...getRadioProps("immediate")} label="Immediate" />
      </Box>
      <AsyncButton
        type="submit"
        pending={queue.length > 0}
        onClick={async () => {
          addToast({ children: "Hello, world!" });

          if (value === "next") {
            return addNextFlow();
          }

          return addImmediateOrReplace(value === "replace");
        }}
        theme="primary"
      >
        Start Example
      </AsyncButton>
      <Snackbar />
      <CodeBlock
        className={styles.code}
        containerProps={{
          className: styles.block,
        }}
        language="typescript"
        lineNumbers={false}
      >
        {JSON.stringify(queue, null, 2)}
      </CodeBlock>
    </Form>
  );
}
