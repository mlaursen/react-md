import { Box, ToastManager, ToastProvider } from "@react-md/core";
import type { ReactElement } from "react";
import { DemoHeadingWithDivider } from "../DemoHeadingWithDivider";
import { Resettable } from "../Resettable";
import { ActionableExample } from "./ActionableExample";
import { IncludeCloseButtonExample } from "./IncludeCloseButtonExample";
import { MultipleLinesExample } from "./MultipleLinesExample";
import { MultipleVisibleToastsExample } from "./MultipleVisibleToastsExample";
import { PreventingDuplicatesExample } from "./PreventingDuplicatesExample";
import { RequireActionExample } from "./RequireActionExample";
import { SimpleExample } from "./SimpleExample";
import { StackedExample } from "./StackedExample";
import { UsingThemesExample } from "./UsingThemesExample";

export default function SnackbarExamples(): ReactElement {
  return (
    <Resettable>
      <Box stacked>
        <DemoHeadingWithDivider>Simple Example</DemoHeadingWithDivider>
        <ToastProvider manager={new ToastManager()}>
          <SimpleExample />
        </ToastProvider>
        <DemoHeadingWithDivider>Actionable Example</DemoHeadingWithDivider>
        <ToastProvider manager={new ToastManager()}>
          <ActionableExample />
        </ToastProvider>
        <DemoHeadingWithDivider>Require Action Example</DemoHeadingWithDivider>
        <ToastProvider manager={new ToastManager()}>
          <RequireActionExample />
        </ToastProvider>
        <DemoHeadingWithDivider>
          Include Close Button Example
        </DemoHeadingWithDivider>
        <ToastProvider manager={new ToastManager()}>
          <IncludeCloseButtonExample />
        </ToastProvider>
        <DemoHeadingWithDivider>Stacked Example</DemoHeadingWithDivider>
        <ToastProvider manager={new ToastManager()}>
          <StackedExample />
        </ToastProvider>
        <DemoHeadingWithDivider>Using Themes Example</DemoHeadingWithDivider>
        <ToastProvider manager={new ToastManager()}>
          <UsingThemesExample />
        </ToastProvider>
        <DemoHeadingWithDivider>Multiple Lines Example</DemoHeadingWithDivider>
        <ToastProvider manager={new ToastManager()}>
          <MultipleLinesExample />
        </ToastProvider>
        <DemoHeadingWithDivider>
          Prevent Duplicates Example
        </DemoHeadingWithDivider>
        <ToastProvider manager={new ToastManager()}>
          <PreventingDuplicatesExample />
        </ToastProvider>
        <DemoHeadingWithDivider>Multiple Visible Toasts</DemoHeadingWithDivider>
        <ToastProvider manager={new ToastManager()}>
          <MultipleVisibleToastsExample />
        </ToastProvider>
      </Box>
    </Resettable>
  );
}
