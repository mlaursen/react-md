import { ReactElement } from "react";
import { TextContainer, Typography } from "@react-md/typography";
import { AppSizeListener, useAppSize } from "@react-md/utils";

import CodeBlock from "components/CodeBlock";

function CurrentSize(): ReactElement {
  const context = useAppSize();
  return (
    <TextContainer>
      <Typography type="headline-6">The current app size is:</Typography>
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
