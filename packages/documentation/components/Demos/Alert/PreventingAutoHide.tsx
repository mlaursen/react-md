import React, { FC } from "react";
import { MessageQueue, useAddMessage } from "@react-md/alert";

const PreventingAutoHide: FC = () => {
  const addMessage = useAddMessage();
  return null;
};

export default () => (
  <MessageQueue id="preventing-autohide-queue">
    <PreventingAutoHide />
  </MessageQueue>
);
