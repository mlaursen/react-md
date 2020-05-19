import React, { FC, useState } from "react";
import { Form, Select } from "@react-md/form";
import {
  DEFAULT_DESKTOP_LAYOUT,
  DEFAULT_LANDSCAPE_TABLET_LAYOUT,
  DEFAULT_PHONE_LAYOUT,
  Layout,
  SupportedPhoneLayout,
  SupportedTabletLayout,
  SupportedWideLayout,
} from "@react-md/layout";
import { Text } from "@react-md/typography";
import { Grid } from "@react-md/utils";

import Code from "components/Code/Code";

import CloseButton from "./CloseButton";

const PHONE_LAYOUTS: SupportedPhoneLayout[] = ["temporary"];
const TABLET_LAYOUTS: SupportedTabletLayout[] = [
  ...PHONE_LAYOUTS,
  "toggleable",
];
const WIDE_LAYOUTS: SupportedWideLayout[] = [
  ...TABLET_LAYOUTS,
  "clipped",
  "floating",
  "full-height",
];

const ConfigurableLayout: FC = () => {
  const [phoneLayout, setPhoneLayout] = useState<SupportedPhoneLayout>(
    DEFAULT_PHONE_LAYOUT
  );
  const [tabletLayout, setTabletLayout] = useState<SupportedTabletLayout>(
    DEFAULT_LANDSCAPE_TABLET_LAYOUT
  );
  const [landscapeTabletLayout, setLandscapeTabletLayout] = useState<
    SupportedTabletLayout
  >(DEFAULT_LANDSCAPE_TABLET_LAYOUT);
  const [desktopLayout, setDesktopLayout] = useState<SupportedWideLayout>(
    DEFAULT_DESKTOP_LAYOUT
  );
  const [largeDesktopLayout, setLargeDesktopLayout] = useState<
    SupportedWideLayout
  >(DEFAULT_DESKTOP_LAYOUT);

  return (
    <Layout
      id="configurable-layout"
      title="Configurable Layout Title"
      navHeaderTitle="Another Title"
      phoneLayout={phoneLayout}
      tabletLayout={tabletLayout}
      landscapeTabletLayout={landscapeTabletLayout}
      desktopLayout={desktopLayout}
      navProps={{
        children: (
          <>
            <CloseButton />
            <Text style={{ padding: "1rem" }}>
              Here is some amazing content that should normally be a navigation
              tree. You can actually still display a navigation tree along with
              any custom content you want by using the{" "}
              <Code>navProps.children</Code>
            </Text>
          </>
        ),
      }}
      // this is only required since I already have a main element due to the
      // documentation site's Layout component
      mainProps={{ component: "div" }}
    >
      <Form>
        <Grid clone columns={2} desktopColumns={4}>
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
        </Grid>
      </Form>
    </Layout>
  );
};

export default ConfigurableLayout;
