import React, { FC, ReactElement } from "react";
import { MessageQueue } from "@react-md/alert";

const PreventingAutoHide: FC = () => {
  // const addMessage = useAddMessage();
  return null;
};

export default (): ReactElement => (
  <MessageQueue id="preventing-autohide-queue">
    <PreventingAutoHide />
  </MessageQueue>
);
