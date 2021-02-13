import React, { ReactElement } from "react";
import { Button } from "@react-md/button";
import { isPersistentLayout, useLayoutConfig } from "@react-md/layout";

import CodeBlock from "components/Code/CodeBlock";
import Blockquote from "components/Blockquote";

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
          The visibility cannot be changed for persistent layouts so the buttons
          will do nothing.
        </Blockquote>
      )}
      <Button onClick={showNav}>Show</Button>
      <Button onClick={hideNav} theme="secondary">
        Hide
      </Button>
    </div>
  );
}
