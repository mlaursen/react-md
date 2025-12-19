import { CodePreview } from "@react-md/code/CodePreview";
import { Box } from "@react-md/core/box/Box";
import { Button } from "@react-md/core/button/Button";
import { Card } from "@react-md/core/card/Card";
import { CardContent } from "@react-md/core/card/CardContent";
import { CardHeader } from "@react-md/core/card/CardHeader";
import { CardSubtitle } from "@react-md/core/card/CardSubtitle";
import { CardTitle } from "@react-md/core/card/CardTitle";
import { chip } from "@react-md/core/chip/styles";
import { TextField } from "@react-md/core/form/TextField";
import { LinearProgress } from "@react-md/core/progress/LinearProgress";
import { Typography } from "@react-md/core/typography/Typography";
import CodeIcon from "@react-md/material-icons/CodeIcon";
import { type ReactElement } from "react";

import { ReactMDLogo } from "@/components/ReactMDLogo.js";

import styles from "./Showcase.module.scss";

export function Showcase(): ReactElement {
  return (
    <Box stacked align="stretch" className={styles.container} disablePadding>
      <CodePreview align="start" borderBottom>
        <Card fullWidth>
          <CardHeader
            beforeAddon={<ReactMDLogo configurable className={styles.logo} />}
            afterAddon={
              <Button buttonType="icon" aria-label="Code">
                <CodeIcon />
              </Button>
            }
          >
            <CardTitle>Wow!</CardTitle>
            <CardSubtitle textOverflow="ellipsis">Multiple themes</CardSubtitle>
          </CardHeader>
          <CardContent disableSecondaryColor>
            <Box stacked disablePadding align="stretch">
              <Box disablePadding>
                <span className={chip({ noninteractive: true })}>react-md</span>
                <span
                  className={chip({
                    backgroundColor: "secondary",
                    noninteractive: true,
                  })}
                >
                  React
                </span>
                <span
                  className={chip({
                    noninteractive: true,
                    backgroundColor: "warning",
                  })}
                >
                  SCSS
                </span>
                <span
                  className={chip({
                    noninteractive: true,
                    backgroundColor: "success",
                  })}
                >
                  Typescript
                </span>
              </Box>
              <TextField label="Label" placeholder="Hello, world!" />
              <Box disablePadding>
                <Button>Button</Button>
                <Button themeType="outline" theme="secondary">
                  Button
                </Button>
                <Button themeType="contained" theme="primary">
                  Button
                </Button>
              </Box>
              <Box disablePadding disableWrap>
                <LinearProgress aria-label="Example progress" value={55} />
                <Typography>55%</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </CodePreview>
    </Box>
  );
}
