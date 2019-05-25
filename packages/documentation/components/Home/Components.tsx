import React, { FC } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardActions,
} from "@react-md/card";
import { Divider } from "@react-md/divider";
import { MediaContainer } from "@react-md/media";
import { Text } from "@react-md/typography";
import { bem } from "@react-md/theme";

import { Code, CodeBlock } from "components/Code";

import { Component as SVG } from "./components.svg";
import LinkButton from "components/LinkButton";

const block = bem("home");

const Components: FC = () => (
  <Card className={block("card")}>
    <CardHeader>
      <CardTitle>Components and Styles</CardTitle>
    </CardHeader>
    <MediaContainer fullWidth>
      <SVG role="presentation" />
    </MediaContainer>
    <CardContent disableSecondaryColor>
      <Text>
        Once you've installed <Code>react-md</Code>, it's time to check out all
        the components that are available and how to use them.
      </Text>
    </CardContent>
    <CodeBlock language="tsx" className={block("code-block")}>
      {`<Button id="example-button" onClick={() => console.log("I was clicked!")}>
  Example Button
</Button>`}
    </CodeBlock>
    <Divider />
    <CardActions>
      <LinkButton href="/packages/app-bar" themeType="outline">
        See Examples!
      </LinkButton>
    </CardActions>
  </Card>
);

export default Components;
