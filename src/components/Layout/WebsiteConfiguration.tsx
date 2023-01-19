import type {
  SupportedPhoneLayout,
  SupportedTabletLayout,
  SupportedWideLayout,
} from "@react-md/core";
import {
  Box,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Divider,
  Fieldset,
  Form,
  Legend,
  Option,
  Select,
} from "@react-md/core";
import type { ReactElement } from "react";
import type { PrismTheme } from "../Code";
import { PRISM_THEMES, useCodeConfig } from "../Code";
import { ColorSchemeButtons } from "./ColorSchemeButtons";
import { useWebsiteConfiguration } from "./WebsideConfigurationProvider";
import { WritingDirectionButtons } from "./WritingDirectionButtons";

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
  const { theme, setTheme } = useCodeConfig();
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
            <WritingDirectionButtons />
            <Divider />
            <ColorSchemeButtons />
            <Divider />
            <Select
              label="Code Theme"
              name="theme"
              value={theme}
              stretch
              onChange={(event) =>
                setTheme(event.currentTarget.value as PrismTheme)
              }
            >
              {PRISM_THEMES.map((theme) => (
                <Option key={theme} value={theme}>
                  {theme}
                </Option>
              ))}
            </Select>
            <Divider />
            <Fieldset fullWidth>
              <Box stacked disablePadding align="stretch">
                <Legend>Layout</Legend>
                <Select
                  label="Desktop"
                  name="desktopLayout"
                  value={desktopLayout}
                  onChange={(event) =>
                    setDesktopLayout(
                      event.currentTarget.value as SupportedWideLayout
                    )
                  }
                  stretch
                >
                  {DESKTOP_LAYOUTS.map((layout) => (
                    <Option key={layout} value={layout}>
                      {layout}
                    </Option>
                  ))}
                </Select>
                <Select
                  label="Large Desktop"
                  name="largeDesktopLayout"
                  value={largeDesktopLayout}
                  onChange={(event) =>
                    setLargeDesktopLayout(
                      event.currentTarget.value as SupportedWideLayout
                    )
                  }
                  stretch
                >
                  {DESKTOP_LAYOUTS.map((layout) => (
                    <Option key={layout} value={layout}>
                      {layout}
                    </Option>
                  ))}
                </Select>
                <Select
                  label="Tablet"
                  name="tabletLayout"
                  value={tabletLayout}
                  onChange={(event) =>
                    setTabletLayout(
                      event.currentTarget.value as SupportedTabletLayout
                    )
                  }
                  stretch
                >
                  {TABLET_LAYOUTS.map((layout) => (
                    <Option key={layout} value={layout}>
                      {layout}
                    </Option>
                  ))}
                </Select>
                <Select
                  label="Landscape Tablet"
                  name="landscapeTabletLayout"
                  value={landscapeTabletLayout}
                  onChange={(event) =>
                    setLandscapeTabletLayout(
                      event.currentTarget.value as SupportedTabletLayout
                    )
                  }
                  stretch
                >
                  {TABLET_LAYOUTS.map((layout) => (
                    <Option key={layout} value={layout}>
                      {layout}
                    </Option>
                  ))}
                </Select>
                <Select
                  label="Phone"
                  name="phoneLayout"
                  value={phoneLayout}
                  onChange={(event) =>
                    setPhoneLayout(
                      event.currentTarget.value as SupportedPhoneLayout
                    )
                  }
                  stretch
                >
                  {PHONE_LAYOUTS.map((layout) => (
                    <Option key={layout} value={layout}>
                      {layout}
                    </Option>
                  ))}
                </Select>
              </Box>
            </Fieldset>
          </Box>
        </Form>
      </DialogContent>
    </>
  );
}
