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

import { Component as SVG } from "./customization.svg";

const block = bem("home");

const GettingStarted: FunctionComponent = () => (
  <Card className={block("card")}>
    <CardHeader>
      <CardTitle>Customization and Themes</CardTitle>
    </CardHeader>
    <MediaContainer fullWidth>
      <SVG role="presentation" />
    </MediaContainer>
    <CardContent disableSecondaryColor>
      <Text>
        Now that you've gotten the hang of using components from{" "}
        <Code>react-md</Code>, it's time to make your app feel unique! There's
        no point in having every app look exactly the same especially when you
        need to add your company's branding.
      </Text>
    </CardContent>
    <Divider />
    <CardActions>
      <LinkButton href="/customization/color-palette" themeType="outline">
        Customize!
      </LinkButton>
    </CardActions>
  </Card>
);

export default GettingStarted;
