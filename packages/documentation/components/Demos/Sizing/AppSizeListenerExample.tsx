import React, { FC } from "react";
import { AppSizeListener, useAppSizeContext } from "@react-md/sizing";
import { TextContainer, Text } from "@react-md/typography";
import CodeBlock from "components/Code/CodeBlock";

const CurrentSize = () => {
  const context = useAppSizeContext();
  return (
    <TextContainer>
      <Text type="headline-6">The current app size is:</Text>
      <CodeBlock language="json">{JSON.stringify(context, null, 2)}</CodeBlock>
    </TextContainer>
  );
};

const AppSizeListenerExample: FC = () => (
  <AppSizeListener>
    <CurrentSize />
  </AppSizeListener>
);

export default AppSizeListenerExample;
