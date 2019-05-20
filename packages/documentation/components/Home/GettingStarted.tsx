import React, { FunctionComponent } from "react";
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

import { Code } from "components/Code";
import LinkButton from "components/LinkButton";

import { Component as SVG } from "./getting-started.svg";

const block = bem("home");

const GettingStarted: FunctionComponent = () => (
  <Card className={block("card")}>
    <CardHeader>
      <CardTitle>Getting Started</CardTitle>
    </CardHeader>
    <MediaContainer fullWidth>
      <SVG role="presentation" />
    </MediaContainer>
    <CardContent disableSecondaryColor>
      <Text>
        To get started, you must first install <Code>react-md</Code>. Next, you
        should include the <Code>Roboto</Code> font and optionally{" "}
        <Code>material-icons</Code> if using font icons. Check out the full
        installation page for more info about updating existing applications,{" "}
        <Code>create-react-app</Code>, or <Code>next.js</Code>
      </Text>
    </CardContent>
    <Divider />
    <CardActions>
      <LinkButton href="/getting-started/quick-start" themeType="outline">
        Get started!
      </LinkButton>
    </CardActions>
  </Card>
);

export default GettingStarted;
