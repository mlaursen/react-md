import { CodePreviewContainer } from "@/components/CodePreviewContainer.jsx";
import Logo from "@/components/Logo.jsx";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardSubtitle,
  CardTitle,
  LinearProgress,
  TextField,
  Typography,
  chip,
} from "react-md";
import CodeIcon from "@react-md/material-icons/CodeIcon";
import { type ReactElement } from "react";
import styles from "./Showcase.module.scss";

export function Showcase(): ReactElement {
  return (
    <Box stacked align="stretch" className={styles.container} disablePadding>
      <CodePreviewContainer align="start" borderBottom>
        <Card fullWidth>
          <CardHeader
            beforeAddon={<Logo configurable className={styles.logo} />}
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
      </CodePreviewContainer>
    </Box>
  );
}
