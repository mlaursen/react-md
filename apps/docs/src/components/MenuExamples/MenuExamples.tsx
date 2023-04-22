import { Box, MenuConfigurationProvider } from "@react-md/core";
import type { ReactElement } from "react";
import { DemoHeadingWithDivider } from "../DemoHeadingWithDivider";
import { Resettable } from "../Resettable";
import { CheckboxMenuItemExample } from "./CheckboxMenuItemExample";
import { ContextMenuExample } from "./ContextMenuExample";
import { DisableConditionalRenderingExample } from "./DisableConditionalRenderingExample";
import { FileInputMenuItemExample } from "./FileInputMenuItemExample";
import { HorizontalExample } from "./HorizontalExample";
import { IconButtonExample } from "./IconButtonExample";
import { MenuBarExample } from "./MenuBarExample";
import { MenuItemAddonExample } from "./MenuItemAddonExample";
import { MobileActionSheetExample } from "./MobileActionSheetExample";
import { NestedMenuExample } from "./NestedMenuExample";
import { PreventingScrollExample } from "./PreventingScrollExample";
import { RadioMenuItemExample } from "./RadioMenuItemExample";
import { SimpleExample } from "./SimpleExample";
import { StylingButtonExample } from "./StylingButtonExample";
import { SwitchMenuItemExample } from "./SwitchMenuItemExample";
import { TextFieldMenuItemExample } from "./TextFieldMenuItemExample";

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
          <DemoHeadingWithDivider>
            Checkbox Menu Item Example
          </DemoHeadingWithDivider>
          <CheckboxMenuItemExample />
          <DemoHeadingWithDivider>
            Radio Menu Item Example
          </DemoHeadingWithDivider>
          <RadioMenuItemExample />
          <DemoHeadingWithDivider>
            Switch Menu Item Example
          </DemoHeadingWithDivider>
          <SwitchMenuItemExample />
          <DemoHeadingWithDivider>
            Text Field Menu Item Example
          </DemoHeadingWithDivider>
          <TextFieldMenuItemExample />
          <DemoHeadingWithDivider>
            File Input Menu Item Example
          </DemoHeadingWithDivider>
          <FileInputMenuItemExample />
        </Box>
      </Resettable>
    </MenuConfigurationProvider>
  );
}
