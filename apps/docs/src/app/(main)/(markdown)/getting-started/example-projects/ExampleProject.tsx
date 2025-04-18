import { Avatar } from "@react-md/core/avatar/Avatar";
import { Box } from "@react-md/core/box/Box";
import { Card } from "@react-md/core/card/Card";
import { Typography } from "@react-md/core/typography/Typography";
import { typography } from "@react-md/core/typography/typographyStyles";
import Image from "next/image.js";
import { type ReactElement } from "react";

import { ExampleLink } from "./ExampleLink.jsx";
import nextjs from "./nextjs.svg";
import vitejs from "./vitejs.svg";

const FRAMEWORK_ICONS = {
  nextjs,
  vitejs,
} as const;

export interface ExampleProjectProps {
  js?: string;
  ts?: string;
  title: string;
  framework: keyof typeof FRAMEWORK_ICONS;
}

export function ExampleProject(
  props: Readonly<ExampleProjectProps>
): ReactElement {
  const { js, ts, title, framework } = props;
  const icon = FRAMEWORK_ICONS[framework];

  return (
    <Card>
      <Box fullWidth disableWrap>
        <Avatar style={{ "--rmd-avatar-background-color": "transparent" }}>
          <Image src={icon} alt={framework} />
        </Avatar>
        <Box align="start" stacked fullWidth disableGap disablePadding>
          <Typography margin="none">{title}</Typography>
          <Box
            justify="start"
            className={typography({ type: "body-2" })}
            fullWidth
            disableGap="row"
            disablePadding
          >
            {js && <ExampleLink type="js" path={js} />}
            {ts && <ExampleLink type="ts" path={ts} />}
          </Box>
        </Box>
      </Box>
    </Card>
  );
}
