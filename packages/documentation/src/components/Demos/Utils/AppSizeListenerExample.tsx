import React, { ReactElement } from "react";
import { TextContainer, Text } from "@react-md/typography";
import { AppSizeListener, useAppSize } from "@react-md/utils";

import CodeBlock from "components/Code/CodeBlock";

function CurrentSize(): ReactElement {
  const context = useAppSize();
  return (
    <TextContainer>
      <Text type="headline-6">The current app size is:</Text>
      <CodeBlock language="json" suppressHydrationWarning>
        {JSON.stringify(context, null, 2)}
      </CodeBlock>
    </TextContainer>
  );
}

export default function AppSizeListenerExample(): ReactElement {
  return (
    <AppSizeListener>
      <CurrentSize />
    </AppSizeListener>
  );
}
