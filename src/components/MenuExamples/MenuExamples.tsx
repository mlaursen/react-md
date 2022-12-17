import { Box } from "@react-md/core";
import { MenuConfigurationProvider } from "@react-md/menu";
import type { ReactElement } from "react";
import { DemoHeadingWithDivider } from "../DemoHeadingWithDivider";
import { Resettable } from "../Resettable";
import { ContextMenuExample } from "./ContextMenuExample";
import { DisableConditionalRenderingExample } from "./DisableConditionalRenderingExample";
import { HorizontalExample } from "./HorizontalExample";
import { IconButtonExample } from "./IconButtonExample";
import { MenuBarExample } from "./MenuBarExample";
import { MenuItemAddonExample } from "./MenuItemAddonExample";
import { MobileActionSheetExample } from "./MobileActionSheetExample";
import { NestedMenuExample } from "./NestedMenuExample";
import { PreventingScrollExample } from "./PreventingScrollExample";
import { SimpleExample } from "./SimpleExample";
import { StylingButtonExample } from "./StylingButtonExample";

export default function MenuExamples(): ReactElement {
  return (
    <MenuConfigurationProvider renderAsSheet={false}>
      <Resettable>
        <Box stacked>
          <DemoHeadingWithDivider>Simple Example</DemoHeadingWithDivider>
          <SimpleExample />
          <DemoHeadingWithDivider>Icon Button Example</DemoHeadingWithDivider>
          <IconButtonExample />
          <DemoHeadingWithDivider>
            Styling Button Example
          </DemoHeadingWithDivider>
          <StylingButtonExample />
          <DemoHeadingWithDivider>Horizontal Example</DemoHeadingWithDivider>
          <HorizontalExample />
          <DemoHeadingWithDivider>
            Menu Item Addons Example
          </DemoHeadingWithDivider>
          <MenuItemAddonExample />
          <DemoHeadingWithDivider>Nested Menu Example</DemoHeadingWithDivider>
          <NestedMenuExample />
          <DemoHeadingWithDivider>
            Prevent Scroll Example
          </DemoHeadingWithDivider>
          <PreventingScrollExample />
          <DemoHeadingWithDivider>
            Disable Conditional Rendering Example
          </DemoHeadingWithDivider>
          <DisableConditionalRenderingExample />
          <DemoHeadingWithDivider>Context Menu Example</DemoHeadingWithDivider>
          <ContextMenuExample />
          <DemoHeadingWithDivider>
            Mobile Action Sheet Example
          </DemoHeadingWithDivider>
          <MobileActionSheetExample />
          <DemoHeadingWithDivider>Menu Bar Example</DemoHeadingWithDivider>
          <MenuBarExample />
        </Box>
      </Resettable>
    </MenuConfigurationProvider>
  );
}
