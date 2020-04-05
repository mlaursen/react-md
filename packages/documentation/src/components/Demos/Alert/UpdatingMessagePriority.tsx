import React, {
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  Message,
  MessagePriority,
  MessageQueue,
  useAddMessage,
  useQueue,
} from "@react-md/alert";
import { Button } from "@react-md/button";
import { Fieldset, Form, Radio, useChoice } from "@react-md/form";
import { Text } from "@react-md/typography";

import "./UpdatingMessagePriority.scss";

interface ExampleMessage
  extends Required<Pick<Message, "messageId" | "messagePriority">> {
  children: string;
}

const PRIORITIES: MessagePriority[] = ["next", "immediate", "replace"];

const UpdatingMessagePriority: FC = () => {
  const addMessage = useAddMessage<ExampleMessage>();
  const [priority, handlePriorityChange] = useChoice<MessagePriority>("next");
  const queue = useQueue<ExampleMessage>();
  const [running, setRunning] = useState(false);

  if (running && !queue.length) {
    setRunning(false);
  }

  const exampleNextFlow = useCallback(() => {
    addMessage({
      messageId: "message-1",
      children: "First normal message",
      messagePriority: "normal",
    });
    addMessage({
      messageId: "message-2",
      children: "Second normal message",
      messagePriority: "normal",
    });
    setRunning(true);
  }, [addMessage]);

  useEffect(() => {
    if (!running) {
      return;
    }

    const timeout = window.setTimeout(() => {
      addMessage({
        messageId: priority === "replace" ? "message-1" : "message-3",
        children: "Incoming Message!",
        messagePriority: priority,
      });
    }, 2000);

    return () => {
      window.clearTimeout(timeout);
    };

    // only want to run on running chagnes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  return (
    <>
      <div className="updating-message-priority">
        <Text type="headline-6" margin="bottom">
          Message queue:
        </Text>
        {queue.map((message, i) => (
          // actually want to disable it since when the immediate flow is triggered, there will be two messageId
          // with "message-1" for a few milliseconds
          <pre key={i}>{JSON.stringify(message, null, 2)}</pre>
        ))}
      </div>
      <Form onSubmit={exampleNextFlow}>
        <Fieldset legend="Priority">
          {PRIORITIES.map((p) => (
            <Radio
              key={p}
              id={`priority-${p}`}
              name="messagePriority"
              label={`Example with "${p}" priority`}
              value={p}
              checked={p === priority}
              onChange={handlePriorityChange}
            />
          ))}
        </Fieldset>
        <Button
          id="update-message-priority-submit"
          type="submit"
          disabled={queue.length > 0}
        >
          Create message
        </Button>
      </Form>
    </>
  );
};

export default (): ReactElement => (
  <MessageQueue<ExampleMessage> id="updating-message-priority">
    <UpdatingMessagePriority />
  </MessageQueue>
);
