import React, { FC, Fragment, ReactElement } from "react";
import {
  DuplicateBehavior,
  MessageQueue,
  ToastMessage,
  useAddMessage,
} from "@react-md/alert";
import { Form, useChoice, Fieldset, NativeSelect } from "@react-md/form";
import Radio from "components/Radio";
import { Divider } from "@react-md/divider";
import { Button } from "@react-md/button";
import Code from "components/Code/Code";
import { ArrowDropDownSVGIcon } from "@react-md/material-icons";

interface Props {
  duplicates: DuplicateBehavior;
  onDuplicateChange: React.ChangeEventHandler<HTMLInputElement>;
}

const ONLINE = "ONLINE";
const OFFLINE = "OFFLINE";
const SOMETHING_HAPPENED = "SOMETHING_HAPPENED";

type MessageKeys = typeof ONLINE | typeof OFFLINE | typeof SOMETHING_HAPPENED;

const MESSAGES: Record<MessageKeys, ToastMessage> = {
  [ONLINE]: {
    messageId: ONLINE,
    children: "Internet connection restored.",
  },
  [OFFLINE]: {
    messageId: OFFLINE,
    children: "Internet connection lost.",
  },
  [SOMETHING_HAPPENED]: {
    messageId: SOMETHING_HAPPENED,
    children: "Something happened...",
  },
};

const HandlingDuplicatedMessages: FC<Props> = ({
  duplicates,
  onDuplicateChange,
}) => {
  const addMessage = useAddMessage();
  const [key, handleKeyChange] = useChoice<MessageKeys>(ONLINE);
  return (
    <Form onSubmit={() => addMessage(MESSAGES[key])}>
      <Fieldset
        legend={
          <Fragment>
            <Code>MessageQueue</Code>
            {" duplicate behavior"}
          </Fragment>
        }
      >
        <Radio
          id="mq-duplicates-1"
          name="duplicates"
          value="allow"
          label="Allow"
          checked={duplicates === "allow"}
          onChange={onDuplicateChange}
        />
        <Radio
          id="mq-duplicates-2"
          name="duplicates"
          value="prevent"
          label="Prevent"
          checked={duplicates === "prevent"}
          onChange={onDuplicateChange}
        />
        <Radio
          id="mq-duplicates-3"
          name="duplicates"
          value="restart"
          label="Restart"
          checked={duplicates === "restart"}
          onChange={onDuplicateChange}
        />
      </Fieldset>
      <NativeSelect
        id="mq-duplicates-message"
        icon={<ArrowDropDownSVGIcon />}
        label="Message"
        inline
        style={{ margin: "1rem 0" }}
        value={key}
        onChange={handleKeyChange}
      >
        {Object.keys(MESSAGES).map(key => (
          <option key={key} value={key}>
            {MESSAGES[key as MessageKeys].children}
          </option>
        ))}
      </NativeSelect>
      <Divider />
      <Button id="mq-duplicates-submit" type="submit" theme="primary">
        Add Message
      </Button>
    </Form>
  );
};

export default (): ReactElement => {
  const [duplicates, onDuplicateChange] = useChoice<DuplicateBehavior>("allow");

  return (
    <MessageQueue id="duplicate-message-queue" duplicates={duplicates}>
      <HandlingDuplicatedMessages
        duplicates={duplicates}
        onDuplicateChange={onDuplicateChange}
      />
    </MessageQueue>
  );
};
