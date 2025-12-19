"use client";

import { AppBar } from "@react-md/core/app-bar/AppBar";
import { AppBarTitle } from "@react-md/core/app-bar/AppBarTitle";
import { Box } from "@react-md/core/box/Box";
import { Button } from "@react-md/core/button/Button";
import { button } from "@react-md/core/button/styles";
import { DialogContent } from "@react-md/core/dialog/DialogContent";
import { Divider } from "@react-md/core/divider/Divider";
import { Form } from "@react-md/core/form/Form";
import { Sheet } from "@react-md/core/sheet/Sheet";
import { Tooltip } from "@react-md/core/tooltip/Tooltip";
import { useTooltip } from "@react-md/core/tooltip/useTooltip";
import { useToggle } from "@react-md/core/useToggle";
import CloseIcon from "@react-md/material-icons/CloseIcon";
import MoreVertOutlinedIcon from "@react-md/material-icons/MoreVertOutlinedIcon";
import Link from "next/link.js";
import { type ReactElement } from "react";

import { ConfigureCodeTheme } from "./ConfigureCodeTheme.js";
import { ConfigureColorScheme } from "./ConfigureColorScheme.js";
import { ConfigureOrientation } from "./ConfigureOrientation.js";
import { ConfigurePackageManager } from "./ConfigurePackageManager.js";
import { ConfigureTypescriptEnabled } from "./ConfigureTypescriptEnabled.js";
import styles from "./WebsiteConfiguration.module.scss";

export function WebsiteConfiguration(): ReactElement {
  const { toggled, enable, disable } = useToggle();
  const { tooltipProps, elementProps } = useTooltip();

  return (
    <>
      <Button
        aria-label="Configuration"
        buttonType="icon"
        onClick={enable}
        {...elementProps}
      >
        <MoreVertOutlinedIcon />
      </Button>
      <Tooltip {...tooltipProps} textOverflow="nowrap">
        Website Configuration
      </Tooltip>
      <Sheet
        aria-label="Configuration"
        position="right"
        visible={toggled}
        onRequestClose={disable}
        className={styles.sheet}
        horizontalSize="none"
      >
        <AppBar theme="clear">
          <AppBarTitle>Configuration</AppBarTitle>
          <Button aria-label="Close" onClick={disable} buttonType="icon">
            <CloseIcon />
          </Button>
        </AppBar>
        <DialogContent>
          <Form>
            <Box align="stretch" stacked disablePadding>
              <ConfigureColorScheme />
              <ConfigureOrientation />
              <Divider />
              <ConfigurePackageManager />
              <Divider />
              <ConfigureTypescriptEnabled />
              <ConfigureCodeTheme />
              <Divider />
              <Link
                href="/customization/colors#playground"
                className={button({
                  theme: "secondary",
                  themeType: "contained",
                })}
                onClick={disable}
              >
                Edit Website Colors
              </Link>
            </Box>
          </Form>
        </DialogContent>
      </Sheet>
    </>
  );
}
