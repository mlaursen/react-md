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

import { Component as SVG } from "./customization.svg";
import JumpStartCard from "./JumpStartCard";

const GettingStarted: FC = () => (
  <JumpStartCard>
    <CardHeader>
      <CardTitle>Customization and Themes</CardTitle>
    </CardHeader>
    <MediaContainer fullWidth>
      <SVG role="presentation" />
    </MediaContainer>
    <CardContent disableSecondaryColor>
      <Text>
        Now that you&apos;ve gotten the hang of using components from{" "}
        <Code>react-md</Code>, it&apos;s time to make your app feel unique!
        There&apos;s no point in having every app look exactly the same
        especially when you need to add your company&apos;s branding.
      </Text>
    </CardContent>
    <Divider />
    <CardActions>
      <LinkButton href="/colors-and-theming/color-palette" themeType="outline">
        Customize!
      </LinkButton>
    </CardActions>
  </JumpStartCard>
);

export default GettingStarted;
