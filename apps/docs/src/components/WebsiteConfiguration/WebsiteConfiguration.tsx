"use client";
import { LoadPrismTheme } from "@/prism-themes/LoadPrismTheme.jsx";
import {
  AppBar,
  AppBarTitle,
  Box,
  Button,
  DialogContent,
  Divider,
  Form,
  Sheet,
  Tooltip,
  button,
  useToggle,
  useTooltip,
} from "@react-md/core";
import CloseIcon from "@react-md/material-icons/CloseIcon";
import MoreVertOutlinedIcon from "@react-md/material-icons/MoreVertOutlinedIcon";
import Link from "next/link.js";
import { type ReactElement } from "react";
import { CircularProgressOverlaySuspense } from "./CircularProgressOverlaySuspense.jsx";
import { ConfigureCodeLanguage } from "./ConfigureCodeLanguage.jsx";
import { ConfigureCodeTheme } from "./ConfigureCodeTheme.jsx";
import { ConfigureColorScheme } from "./ConfigureColorScheme.jsx";
import { ConfigureOrientation } from "./ConfigureOrientation.jsx";
import { ConfigurePackageManager } from "./ConfigurePackageManager.jsx";
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
      <Tooltip {...tooltipProps} disableLineWrap>
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
              <ConfigureCodeLanguage />
              <ConfigureCodeTheme />
              <Divider />
              <Link
                href="/usage/theme-builder"
                className={button({
                  theme: "secondary",
                  themeType: "contained",
                })}
              >
                Edit Website Colors
              </Link>
            </Box>
          </Form>
        </DialogContent>
      </Sheet>
      <CircularProgressOverlaySuspense visible={toggled}>
        <LoadPrismTheme />
      </CircularProgressOverlaySuspense>
    </>
  );
}
