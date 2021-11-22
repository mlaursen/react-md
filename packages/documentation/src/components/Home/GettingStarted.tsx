import { ReactElement } from "react";
import Image from "next/image";
import {
  CardHeader,
  CardTitle,
  CardContent,
  CardActions,
} from "@react-md/card";
import { Divider } from "@react-md/divider";
import { MediaContainer } from "@react-md/media";
import { Typography } from "@react-md/typography";

import Code from "components/Code";
import LinkButton from "components/LinkButton";

import JumpStartCard from "./JumpStartCard";
import gettingStarted from "./getting-started.svg";

export default function GettingStarted(): ReactElement {
  return (
    <JumpStartCard>
      <CardHeader>
        <CardTitle>Getting Started</CardTitle>
      </CardHeader>
      <MediaContainer fullWidth>
        <Image src={gettingStarted} />
      </MediaContainer>
      <CardContent disableSecondaryColor>
        <Typography>
          To get started, you must first install <Code>react-md</Code>. Next,
          you should include the <Code>Roboto</Code> font and optionally{" "}
          <Code>material-icons</Code> if using font icons. Check out the full
          installation page for more info about updating existing applications,{" "}
          <Code>create-react-app</Code>, or <Code>next.js</Code>
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <LinkButton href="/guides/installation" themeType="outline">
          Get started!
        </LinkButton>
      </CardActions>
    </JumpStartCard>
  );
}
