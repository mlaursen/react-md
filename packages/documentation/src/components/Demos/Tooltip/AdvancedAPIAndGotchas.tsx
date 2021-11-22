import { ReactElement } from "react";
import { Button } from "@react-md/button";
import { Tooltipped } from "@react-md/tooltip";
import { Text } from "@react-md/typography";

import CodeBlock from "components/CodeBlock";

function BrokenButton(): ReactElement {
  return <Button>No go</Button>;
}

export default function AdvancedAPIGotchas(): ReactElement {
  return (
    <>
      <Text type="headline-6">Broken Tooltip</Text>
      <Tooltipped id="broken-tooltip" tooltip="I will never appear :(">
        <BrokenButton />
      </Tooltipped>
      <Tooltipped
        id="keyboard-broken-tooltip"
        tooltip="I am inaccessible to keyboard users :("
      >
        <Text>
          This text will have a tooltip, but it will be inaccessible for
          keyboard users.
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
            <>
              <Button {...props}>Button{tooltip}</Button>
              <CodeBlock language="json">
                {JSON.stringify(typedProps, null, 2)}
              </CodeBlock>
            </>
          );
        }}
      </Tooltipped>
    </>
  );
}
