import { AppBar } from "@react-md/core/app-bar/AppBar";
import { AppBarTitle } from "@react-md/core/app-bar/AppBarTitle";
import { Box } from "@react-md/core/box/Box";
import { AsyncButton } from "@react-md/core/button/AsyncButton";
import { Button } from "@react-md/core/button/Button";
import { Card } from "@react-md/core/card/Card";
import { getIcon } from "@react-md/core/icon/config";
import { Typography } from "@react-md/core/typography/Typography";
import { wait } from "@react-md/core/utils/wait";
import AddIcon from "@react-md/material-icons/AddIcon";
import { type ReactElement } from "react";

import styles from "./SimplePreview.module.scss";

export function SimplePreview(): ReactElement {
  return (
    <Card className={styles.container}>
      <AppBar theme="primary">
        <Button aria-label="Menu" buttonType="icon">
          {getIcon("menu")}
        </Button>
        <AppBarTitle>Color</AppBarTitle>
      </AppBar>
      <Box>
        <Typography>Hello, world!</Typography>
      </Box>
      <AsyncButton
        floating="bottom-right"
        floatingProps={{ absolute: true }}
        onClick={() => wait(5000)}
      >
        <AddIcon />
      </AsyncButton>
    </Card>
  );
}
