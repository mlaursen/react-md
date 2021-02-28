import React, { ReactElement } from "react";
import { Form, Select } from "@react-md/form";
import {
  SupportedPhoneLayout,
  SupportedTabletLayout,
  SupportedWideLayout,
  useLayoutConfig,
} from "@react-md/layout";
import { Text } from "@react-md/typography";
import { Grid, useAppSize } from "@react-md/utils";
import Code from "components/Code/Code";

interface ConfigurationFormProps {
  phoneLayout: SupportedPhoneLayout;
  setPhoneLayout(phoneLayout: SupportedPhoneLayout): void;
  tabletLayout: SupportedTabletLayout;
  setTabletLayout(tabletLayout: SupportedTabletLayout): void;
  landscapeTabletLayout: SupportedTabletLayout;
  setLandscapeTabletLayout(landscapeTabletLayout: SupportedTabletLayout): void;
  desktopLayout: SupportedWideLayout;
  setDesktopLayout(desktopLayout: SupportedWideLayout): void;
  largeDesktopLayout: SupportedWideLayout;
  setLargeDesktopLayout(largeDesktopLayout: SupportedWideLayout): void;
}

const PHONE_LAYOUTS: SupportedPhoneLayout[] = ["temporary", "temporary-mini"];
const TABLET_LAYOUTS: SupportedTabletLayout[] = [
  ...PHONE_LAYOUTS,
  "toggleable",
  "toggleable-mini",
];
const WIDE_LAYOUTS: SupportedWideLayout[] = [
  ...TABLET_LAYOUTS,
  "clipped",
  "floating",
  "full-height",
];

export function ConfigurationForm({
  phoneLayout,
  setPhoneLayout,
  tabletLayout,
  setTabletLayout,
  landscapeTabletLayout,
  setLandscapeTabletLayout,
  desktopLayout,
  setDesktopLayout,
  largeDesktopLayout,
  setLargeDesktopLayout,
}: ConfigurationFormProps): ReactElement {
  const { layout } = useLayoutConfig();
  const { isTablet, isDesktop, isLargeDesktop, isLandscape } = useAppSize();
  let size = "Phone";
  if (isTablet) {
    size = `${isLandscape ? "Landscape " : ""}Tablet`;
  } else if (isLargeDesktop) {
    size = "Large Desktop";
  } else if (isDesktop) {
    size = "Desktop";
  }

  return (
    <>
      <Grid cloneStyles columns={1}>
        <Text type="headline-3" margin="top">
          Configuration
        </Text>
        <Text margin="none">
          The current app size is: <Code>{size}</Code>
        </Text>
        <Text margin="none">
          The current layout is: <Code>{layout}</Code>
        </Text>
      </Grid>
      <Grid cloneStyles columns={2} desktopColumns={4}>
        <Form>
          <Select
            id="phone-layout-type"
            label="Phone Layout"
            value={phoneLayout}
            options={PHONE_LAYOUTS}
            onChange={(nextValue) => {
              if (PHONE_LAYOUTS.includes(nextValue as SupportedPhoneLayout)) {
                setPhoneLayout(nextValue as SupportedPhoneLayout);
              }
            }}
          />
          <Select
            id="tablet-layout-type"
            label="Tablet Layout"
            value={tabletLayout}
            options={TABLET_LAYOUTS}
            onChange={(nextValue) => {
              if (TABLET_LAYOUTS.includes(nextValue as SupportedTabletLayout)) {
                setTabletLayout(nextValue as SupportedTabletLayout);
              }
            }}
          />
          <Select
            id="landscape-tablet-layout-type"
            label="Landscape Tablet Layout"
            value={landscapeTabletLayout}
            options={TABLET_LAYOUTS}
            onChange={(nextValue) => {
              if (TABLET_LAYOUTS.includes(nextValue as SupportedTabletLayout)) {
                setLandscapeTabletLayout(nextValue as SupportedTabletLayout);
              }
            }}
          />
          <Select
            id="desktop-layout-type"
            label="Desktop Layout"
            value={desktopLayout}
            options={WIDE_LAYOUTS}
            onChange={(nextValue) => {
              if (WIDE_LAYOUTS.includes(nextValue as SupportedWideLayout)) {
                setDesktopLayout(nextValue as SupportedWideLayout);
              }
            }}
          />
          <Select
            id="large-desktop-layout-type"
            label="Large Desktop Layout"
            value={largeDesktopLayout}
            options={WIDE_LAYOUTS}
            onChange={(nextValue) => {
              if (WIDE_LAYOUTS.includes(nextValue as SupportedWideLayout)) {
                setLargeDesktopLayout(nextValue as SupportedWideLayout);
              }
            }}
          />
        </Form>
      </Grid>
    </>
  );
}
