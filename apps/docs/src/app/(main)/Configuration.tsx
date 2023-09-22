"use client";
import { LoadPrismTheme } from "@/prism-themes/LoadPrismTheme.jsx";
import {
  Box,
  Button,
  DialogContent,
  Divider,
  Form,
  NullSuspense,
  Sheet,
  button,
  useToggle,
} from "@react-md/core";
import MoreVertOutlinedIcon from "@react-md/material-icons/MoreVertOutlinedIcon";
import Link from "next/link.js";
import { type ReactElement } from "react";
import styles from "./Configuration.module.scss";
import { ConfigureCodeLanguage } from "./ConfigureCodeLanguage.jsx";
import { ConfigureCodeTheme } from "./ConfigureCodeTheme.jsx";
import { ConfigureColorScheme } from "./ConfigureColorScheme.jsx";
import { ConfigureOrientation } from "./ConfigureOrientation.jsx";
import { ConfigurePackageManager } from "./ConfigurePackageManager.jsx";

export function Configuration(): ReactElement {
  const { toggled, enable, disable } = useToggle();
  return (
    <>
      <Button aria-label="Configuration" buttonType="icon" onClick={enable}>
        <MoreVertOutlinedIcon />
      </Button>
      <Sheet
        aria-label="Configuration"
        position="right"
        visible={toggled}
        onRequestClose={disable}
        className={styles.sheet}
        horizontalSize="none"
      >
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
      <NullSuspense>
        <LoadPrismTheme />
      </NullSuspense>
    </>
  );
}
