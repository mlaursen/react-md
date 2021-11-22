import { ReactElement } from "react";
import { Button } from "@react-md/button";
import { isPersistentLayout, useLayoutConfig } from "@react-md/layout";
import { Text } from "@react-md/typography";

import Blockquote from "components/Blockquote";
import CodeBlock from "components/CodeBlock";

export default function LayoutVisibility(): ReactElement {
  const { showNav, hideNav, ...remaining } = useLayoutConfig();
  const code = `const config = ${JSON.stringify(
    {
      showNav: "function",
      hideNav: "function",
      ...remaining,
    },
    null,
    2
  )}`;

  return (
    <div>
      <CodeBlock language="typescript">{code}</CodeBlock>
      {isPersistentLayout(remaining.layout) && (
        <Blockquote>
          <Text>
            The visibility cannot be changed for persistent layouts so the
            buttons will do nothing.
          </Text>
        </Blockquote>
      )}
      <Button onClick={showNav}>Show</Button>
      <Button onClick={hideNav} theme="secondary">
        Hide
      </Button>
    </div>
  );
}
