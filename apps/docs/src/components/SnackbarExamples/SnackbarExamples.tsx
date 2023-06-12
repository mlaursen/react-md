import { Box, ToastManager, ToastManagerProvider } from "@react-md/core";
import type { ReactElement } from "react";
import { DemoHeadingWithDivider } from "../DemoHeadingWithDivider";
import { Resettable } from "../Resettable";
import { ActionableExample } from "./ActionableExample";
import { CustomToastRenderer } from "./CustomToastRenderer";
import { IncludeCloseButtonExample } from "./IncludeCloseButtonExample";
import { MultipleLinesExample } from "./MultipleLinesExample";
import { MultipleVisibleToastsExample } from "./MultipleVisibleToastsExample";
import { PreventingDuplicatesExample } from "./PreventingDuplicatesExample";
import { RequireActionExample } from "./RequireActionExample";
import { SimpleExample } from "./SimpleExample";
import { StackedExample } from "./StackedExample";
import { ToastPositionExample } from "./ToastPositionExample";
import { UsingThemesExample } from "./UsingThemesExample";
import { ToastPriorityExample } from "./ToastPriorityExample";

export default function SnackbarExamples(): ReactElement {
  return (
    <Resettable>
      <Box stacked>
        <DemoHeadingWithDivider>Simple Example</DemoHeadingWithDivider>
        <ToastManagerProvider manager={new ToastManager()}>
          <SimpleExample />
        </ToastManagerProvider>
        <DemoHeadingWithDivider>Actionable Example</DemoHeadingWithDivider>
        <ToastManagerProvider manager={new ToastManager()}>
          <ActionableExample />
        </ToastManagerProvider>
        <DemoHeadingWithDivider>Require Action Example</DemoHeadingWithDivider>
        <ToastManagerProvider manager={new ToastManager()}>
          <RequireActionExample />
        </ToastManagerProvider>
        <DemoHeadingWithDivider>
          Include Close Button Example
        </DemoHeadingWithDivider>
        <ToastManagerProvider manager={new ToastManager()}>
          <IncludeCloseButtonExample />
        </ToastManagerProvider>
        <DemoHeadingWithDivider>Stacked Example</DemoHeadingWithDivider>
        <ToastManagerProvider manager={new ToastManager()}>
          <StackedExample />
        </ToastManagerProvider>
        <DemoHeadingWithDivider>Using Themes Example</DemoHeadingWithDivider>
        <ToastManagerProvider manager={new ToastManager()}>
          <UsingThemesExample />
        </ToastManagerProvider>
        <DemoHeadingWithDivider>Multiple Lines Example</DemoHeadingWithDivider>
        <ToastManagerProvider manager={new ToastManager()}>
          <MultipleLinesExample />
        </ToastManagerProvider>
        <DemoHeadingWithDivider>
          Prevent Duplicates Example
        </DemoHeadingWithDivider>
        <ToastManagerProvider manager={new ToastManager()}>
          <PreventingDuplicatesExample />
        </ToastManagerProvider>
        <DemoHeadingWithDivider>Toast Position Example</DemoHeadingWithDivider>
        <ToastManagerProvider manager={new ToastManager()}>
          <ToastPositionExample />
        </ToastManagerProvider>
        <DemoHeadingWithDivider>Multiple Visible Toasts</DemoHeadingWithDivider>
        <ToastManagerProvider manager={new ToastManager()}>
          <MultipleVisibleToastsExample />
        </ToastManagerProvider>
        <DemoHeadingWithDivider>Custom Toast Renderer</DemoHeadingWithDivider>
        <ToastManagerProvider manager={new ToastManager()}>
          <CustomToastRenderer />
        </ToastManagerProvider>
        <DemoHeadingWithDivider>Toast Priority Example</DemoHeadingWithDivider>
        <ToastManagerProvider manager={new ToastManager()}>
          <ToastPriorityExample />
        </ToastManagerProvider>
      </Box>
    </Resettable>
  );
}
