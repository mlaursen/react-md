import React, { FC, Fragment } from "react";
import { Button } from "@react-md/button";
import { Tooltipped } from "@react-md/tooltip";
import { Text } from "@react-md/typography";

import CodeBlock from "components/Code/CodeBlock";

const BrokenButton: FC = () => <Button>No go</Button>;

const AdvancedAPIGotchas: FC = () => (
  <Fragment>
    <Text type="headline-6">Broken Tooltip</Text>
    <Tooltipped id="broken-tooltip" tooltip="I will never appear :(">
      <BrokenButton />
    </Tooltipped>
    <Tooltipped
      id="keyboard-broken-tooltip"
      tooltip="I am inaccessible to keyboard users :("
    >
      <Text>
        This text will have a tooltip, but it will be inaccessible for keyboard
        users.
      </Text>
    </Tooltipped>
    <Text type="headline-6">Children Renderer</Text>
    <Tooltipped
      id="toolip-children-renderer"
      tooltip="This is a tooltip!"
      defaultPosition="above"
    >
      {({ tooltip, ...props }) => {
        // add "air quotes" to typed
        const typedProps = Object.keys(props).reduce(
          (obj, propName) => ({
            ...obj,
            [propName]: propName.startsWith("on") ? "function" : "string",
          }),
          {
            tooltip: "ReactNode",
          }
        );

        return (
          <Fragment>
            <Button {...props}>Button{tooltip}</Button>
            <CodeBlock language="json">
              {JSON.stringify(typedProps, null, 2)}
            </CodeBlock>
          </Fragment>
        );
      }}
    </Tooltipped>
  </Fragment>
);
export default AdvancedAPIGotchas;
