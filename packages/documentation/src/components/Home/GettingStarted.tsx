import React, { FC } from "react";
import {
  CardHeader,
  CardTitle,
  CardContent,
  CardActions,
} from "@react-md/card";
import { Divider } from "@react-md/divider";
import { MediaContainer } from "@react-md/media";
import { Text } from "@react-md/typography";

import { Code } from "components/Code";
import LinkButton from "components/LinkButton";

import JumpStartCard from "./JumpStartCard";
import { Component as SVG } from "./getting-started.svg";

const GettingStarted: FC = () => (
  <JumpStartCard>
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
      <LinkButton
        href="/guides/[id]"
        as="/guides/installation"
        themeType="outline"
      >
        Get started!
      </LinkButton>
    </CardActions>
  </JumpStartCard>
);

export default GettingStarted;
