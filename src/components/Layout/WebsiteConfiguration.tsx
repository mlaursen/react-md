import { Button } from "@react-md/button";
import { Box, Divider, useColorScheme, useDir } from "@react-md/core";
import { DialogContent, DialogHeader, DialogTitle } from "@react-md/dialog";
import { Fieldset, Form, Legend, NativeSelect } from "@react-md/form";
import type {
  SupportedPhoneLayout,
  SupportedTabletLayout,
  SupportedWideLayout,
} from "@react-md/layout";
import type { ReactElement } from "react";
import type { PrismTheme } from "../Code";
import { PRISM_THEMES, useCodeConfig } from "../Code";
import { useWebsiteConfiguration } from "./WebsideConfigurationProvider";

const PHONE_LAYOUTS: readonly SupportedPhoneLayout[] = [
  "temporary",
  "temporary-mini",
];

const TABLET_LAYOUTS: readonly SupportedTabletLayout[] = [
  ...PHONE_LAYOUTS,
  "toggleable",
  "toggleable-mini",
];

const DESKTOP_LAYOUTS: readonly SupportedWideLayout[] = [
  ...TABLET_LAYOUTS,
  "floating",
  "clipped",
  "full-height",
];

export function WebsiteConfiguration(): ReactElement {
  const { dir, toggleDir } = useDir();
  const { theme, setTheme } = useCodeConfig();
  const { colorSchemeMode, setColorSchemeMode } = useColorScheme();
  const {
    phoneLayout,
    setPhoneLayout,
    tabletLayout,
    setTabletLayout,
    desktopLayout,
    setDesktopLayout,
    largeDesktopLayout,
    setLargeDesktopLayout,
    landscapeTabletLayout,
    setLandscapeTabletLayout,
  } = useWebsiteConfiguration();
  return (
    <>
      <DialogHeader>
        <DialogTitle type="headline-5">Configuration</DialogTitle>
      </DialogHeader>
      <DialogContent>
        <Form>
          <Box disablePadding align="start" stacked>
            <Button
              aria-pressed={dir === "rtl"}
              onClick={toggleDir}
              themeType="outline"
            >
              {dir}
            </Button>
            <Button
              themeType="outline"
              onClick={() => {
                setColorSchemeMode((mode) => {
                  if (mode === "dark") {
                    return "system";
                  }
                  if (mode === "system") {
                    return "light";
                  }

                  return "dark";
                });
              }}
            >
              {colorSchemeMode}
            </Button>
            <NativeSelect
              label="Code Theme"
              name="theme"
              value={theme}
              onChange={(event) =>
                setTheme(event.currentTarget.value as PrismTheme)
              }
            >
              {PRISM_THEMES.map((theme) => (
                <option key={theme} value={theme}>
                  {theme}
                </option>
              ))}
            </NativeSelect>
            <Divider />
            <Fieldset style={{ width: "100%" }}>
              <Box stacked disablePadding align="stretch">
                <Legend>Layout</Legend>
                <NativeSelect
                  label="Desktop"
                  name="desktopLayout"
                  value={desktopLayout}
                  onChange={(event) =>
                    setDesktopLayout(
                      event.currentTarget.value as SupportedWideLayout
                    )
                  }
                >
                  {DESKTOP_LAYOUTS.map((layout) => (
                    <option key={layout} value={layout}>
                      {layout}
                    </option>
                  ))}
                </NativeSelect>
                <NativeSelect
                  label="Large Desktop"
                  name="largeDesktopLayout"
                  value={largeDesktopLayout}
                  onChange={(event) =>
                    setLargeDesktopLayout(
                      event.currentTarget.value as SupportedWideLayout
                    )
                  }
                >
                  {DESKTOP_LAYOUTS.map((layout) => (
                    <option key={layout} value={layout}>
                      {layout}
                    </option>
                  ))}
                </NativeSelect>
                <NativeSelect
                  label="Tablet"
                  name="tabletLayout"
                  value={tabletLayout}
                  onChange={(event) =>
                    setTabletLayout(
                      event.currentTarget.value as SupportedTabletLayout
                    )
                  }
                >
                  {TABLET_LAYOUTS.map((layout) => (
                    <option key={layout} value={layout}>
                      {layout}
                    </option>
                  ))}
                </NativeSelect>
                <NativeSelect
                  label="Landscape Tablet"
                  name="landscapeTabletLayout"
                  value={landscapeTabletLayout}
                  onChange={(event) =>
                    setLandscapeTabletLayout(
                      event.currentTarget.value as SupportedTabletLayout
                    )
                  }
                >
                  {TABLET_LAYOUTS.map((layout) => (
                    <option key={layout} value={layout}>
                      {layout}
                    </option>
                  ))}
                </NativeSelect>
                <NativeSelect
                  label="Phone"
                  name="phoneLayout"
                  value={phoneLayout}
                  onChange={(event) =>
                    setPhoneLayout(
                      event.currentTarget.value as SupportedPhoneLayout
                    )
                  }
                >
                  {PHONE_LAYOUTS.map((layout) => (
                    <option key={layout} value={layout}>
                      {layout}
                    </option>
                  ))}
                </NativeSelect>
              </Box>
            </Fieldset>
          </Box>
        </Form>
      </DialogContent>
    </>
  );
}
