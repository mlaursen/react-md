import React, { FC } from "react";
import { MessageQueue, useAddMessage } from "@react-md/alert";
import { Button } from "@react-md/button";
import { Form } from "@react-md/form";

const UpdatingMessagePriority: FC = () => {
  const addMessage = useAddMessage();
  return (
    <Form
      onSubmit={() =>
        addMessage({
          children: `This is a message at ${new Date().toLocaleTimeString()}`,
          messagePriority: "next",
        })
      }
    >
      <Button id="update-message-priority-submit" type="submit">
        Create message
      </Button>
    </Form>
  );
};

export default () => (
  <MessageQueue id="updating-message-priority">
    <UpdatingMessagePriority />
  </MessageQueue>
);
