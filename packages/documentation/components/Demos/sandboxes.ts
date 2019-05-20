/** this is a generated file from `dev-utils sandbox` */
import { IFiles } from "codesandbox-import-utils/lib/api/define";

import { upperFirst, toTitle } from "utils/toTitle";

interface SandboxesRecord {
  [key: string]: () => Promise<IFiles>;
}

const resolve = (importer: Promise<any>) =>
  importer.then(content => content.default as IFiles);

const sandboxes: SandboxesRecord = {
  "AppBar/AnimatingAppBar": () =>
    resolve(import("./AppBar/AnimatingAppBarSandbox.json")),
  "AppBar/AutoDense": () => resolve(import("./AppBar/AutoDenseSandbox.json")),
  "AppBar/DifferentSizes": () =>
    resolve(import("./AppBar/DifferentSizesSandbox.json")),
  "AppBar/FixedWithOffset": () =>
    resolve(import("./AppBar/FixedWithOffsetSandbox.json")),
  "AppBar/SimpleUsage": () =>
    resolve(import("./AppBar/SimpleUsageSandbox.json")),
  "Avatar/ColorExamples": () =>
    resolve(import("./Avatar/ColorExamplesSandbox.json")),
  "Avatar/SimpleUsage": () =>
    resolve(import("./Avatar/SimpleUsageSandbox.json")),
  "Button/ContainedButtons": () =>
    resolve(import("./Button/ContainedButtonsSandbox.json")),
  "Button/CustomButtonTheme": () =>
    resolve(import("./Button/CustomButtonThemeSandbox.json")),
  "Button/IconButtons": () =>
    resolve(import("./Button/IconButtonsSandbox.json")),
  "Button/OutlinedButtons": () =>
    resolve(import("./Button/OutlinedButtonsSandbox.json")),
  "Button/TextButtons": () =>
    resolve(import("./Button/TextButtonsSandbox.json")),
  "Button/TextButtonsWithIcons": () =>
    resolve(import("./Button/TextButtonsWithIconsSandbox.json")),
  "Card/ExpandableCards": () =>
    resolve(import("./Card/ExpandableCardsSandbox.json")),
  "Card/SimpleExample": () =>
    resolve(import("./Card/SimpleExampleSandbox.json")),
  "Card/WithActions": () => resolve(import("./Card/WithActionsSandbox.json")),
  "Card/WithMedia": () => resolve(import("./Card/WithMediaSandbox.json")),
  "Dialog/AlertDialogsAndModals": () =>
    resolve(import("./Dialog/AlertDialogsAndModalsSandbox.json")),
  "Dialog/FullPageExample": () =>
    resolve(import("./Dialog/FullPageExampleSandbox.json")),
  "Dialog/NestedDialogs": () =>
    resolve(import("./Dialog/NestedDialogsSandbox.json")),
  "Dialog/SimpleExample": () =>
    resolve(import("./Dialog/SimpleExampleSandbox.json")),
  "Dialog/SimpleListExample": () =>
    resolve(import("./Dialog/SimpleListExampleSandbox.json")),
  "Divider/HorizontalDividers": () =>
    resolve(import("./Divider/HorizontalDividersSandbox.json")),
  "Divider/VerticalDividers": () =>
    resolve(import("./Divider/VerticalDividersSandbox.json")),
  "Divider/WithinLists": () =>
    resolve(import("./Divider/WithinListsSandbox.json")),
  "Elevation/AllElevations": () =>
    resolve(import("./Elevation/AllElevationsSandbox.json")),
  "Elevation/AnimatingElevation": () =>
    resolve(import("./Elevation/AnimatingElevationSandbox.json")),
  "Icon/IconSpacing": () => resolve(import("./Icon/IconSpacingSandbox.json")),
  "Icon/SimpleExamples": () =>
    resolve(import("./Icon/SimpleExamplesSandbox.json")),
  "Link/MaliciousTarget": () =>
    resolve(import("./Link/MaliciousTargetSandbox.json")),
  "Link/SimpleExamples": () =>
    resolve(import("./Link/SimpleExamplesSandbox.json")),
  "Link/ThirdPartyRoutingLibraries": () =>
    resolve(import("./Link/ThirdPartyRoutingLibrariesSandbox.json")),
  "Link/WithButtonStyles": () =>
    resolve(import("./Link/WithButtonStylesSandbox.json")),
  "Link/WithIcons": () => resolve(import("./Link/WithIconsSandbox.json")),
  "List/NonInteractable": () =>
    resolve(import("./List/NonInteractableSandbox.json")),
  "List/SingleLineExamples": () =>
    resolve(import("./List/SingleLineExamplesSandbox.json")),
  "List/ThreeLineExamples": () =>
    resolve(import("./List/ThreeLineExamplesSandbox.json")),
  "List/TwoLineExamples": () =>
    resolve(import("./List/TwoLineExamplesSandbox.json")),
  "MaterialIcons/AllIcons": () =>
    resolve(import("./MaterialIcons/AllIconsSandbox.json")),
  "MaterialIcons/SimpleExamples": () =>
    resolve(import("./MaterialIcons/SimpleExamplesSandbox.json")),
  "Media/ForcedAspectRatio": () =>
    resolve(import("./Media/ForcedAspectRatioSandbox.json")),
  "Media/SimpleResponsiveMedia": () =>
    resolve(import("./Media/SimpleResponsiveMediaSandbox.json")),
  "Media/WithOverlay": () => resolve(import("./Media/WithOverlaySandbox.json")),
  "Overlay/CustomTheme": () =>
    resolve(import("./Overlay/CustomThemeSandbox.json")),
  "Overlay/FixingOverflowIssues": () =>
    resolve(import("./Overlay/FixingOverflowIssuesSandbox.json")),
  "Overlay/SimpleExample": () =>
    resolve(import("./Overlay/SimpleExampleSandbox.json")),
  "Portal/CustomPortalContainer": () =>
    resolve(import("./Portal/CustomPortalContainerSandbox.json")),
  "Portal/SimpleExample": () =>
    resolve(import("./Portal/SimpleExampleSandbox.json")),
  "Progress/SimpleDeterminateExamples": () =>
    resolve(import("./Progress/SimpleDeterminateExamplesSandbox.json")),
  "Progress/SimpleIndeterminateExamples": () =>
    resolve(import("./Progress/SimpleIndeterminateExamplesSandbox.json")),
  "Progress/WithinButtons": () =>
    resolve(import("./Progress/WithinButtonsSandbox.json")),
  "Progress/WithSuspense": () =>
    resolve(import("./Progress/WithSuspenseSandbox.json")),
  "Sheet/PositionExamples": () =>
    resolve(import("./Sheet/PositionExamplesSandbox.json")),
  "Sizing/AppSizeListenerExample": () =>
    resolve(import("./Sizing/AppSizeListenerExampleSandbox.json")),
  "Sizing/MediaQueryComponents": () =>
    resolve(import("./Sizing/MediaQueryComponentsSandbox.json")),
  "Sizing/ResizeListenerExample": () =>
    resolve(import("./Sizing/ResizeListenerExampleSandbox.json")),
  "Sizing/ResizeObserverExample": () =>
    resolve(import("./Sizing/ResizeObserverExampleSandbox.json")),
  "States/CustomComponent": () =>
    resolve(import("./States/CustomComponentSandbox.json")),
  "States/CustomInteractions": () =>
    resolve(import("./States/CustomInteractionsSandbox.json")),
  "States/DisablingRippleEffect": () =>
    resolve(import("./States/DisablingRippleEffectSandbox.json")),
  "States/SetupExample": () =>
    resolve(import("./States/SetupExampleSandbox.json")),
  "Theme/SimpleExample": () =>
    resolve(import("./Theme/SimpleExampleSandbox.json")),
  "Tooltip/AdvancedAPIAndGotchas": () =>
    resolve(import("./Tooltip/AdvancedAPIAndGotchasSandbox.json")),
  "Tooltip/AutoPositioningTooltips": () =>
    resolve(import("./Tooltip/AutoPositioningTooltipsSandbox.json")),
  "Tooltip/CommonPatterns": () =>
    resolve(import("./Tooltip/CommonPatternsSandbox.json")),
  "Tooltip/DenseTooltips": () =>
    resolve(import("./Tooltip/DenseTooltipsSandbox.json")),
  "Tooltip/HoverMode": () => resolve(import("./Tooltip/HoverModeSandbox.json")),
  "Tooltip/LargeTooltips": () =>
    resolve(import("./Tooltip/LargeTooltipsSandbox.json")),
  "Tooltip/SimpleExamples": () =>
    resolve(import("./Tooltip/SimpleExamplesSandbox.json")),
  "Typography/TextContainerExamples": () =>
    resolve(import("./Typography/TextContainerExamplesSandbox.json")),
  "Typography/TextExamples": () =>
    resolve(import("./Typography/TextExamplesSandbox.json")),
};

const dummy = () =>
  Promise.resolve<IFiles>({
    "package.json": {
      isBinary: false,
      content: JSON.stringify({
        dependencies: {
          react: "latest",
          "react-dom": "latest",
        },
      }),
    },
    "src/index.tsx": { content: "", isBinary: false },
    "src/Demo.tsx": { content: "", isBinary: false },
  });

export default function getSandboxer(packageName: string, demoName: string) {
  packageName = packageName.replace(/ /g, "");
  demoName = demoName
    .split(" ")
    .map(upperFirst)
    .join("");
  const sandboxer = sandboxes[`${packageName}/${demoName}`];
  if (!sandboxer) {
    const msgStart = `Unable to find a sandbox import for \`${demoName}\``;
    let message = msgStart;
    if (typeof window !== "undefined") {
      const { pathname } = window.location;
      const expected = toTitle(pathname.replace(/.+\/([a-z-]+)\/.+$/, "$1"));
      if (expected !== packageName) {
        message = `${message}.

Got \`${packageName}\` as the current package name, but based on the url it
should probably be \`${expected}\`. Make sure the \`index.tsx\` file has the
correct \`pakageName\` prop set on the \`DemosPage\` component.`;
      }
    }

    if (message === msgStart) {
      message = `${message} in the \`${packageName}\` demo section.`;
    }

    message = `${message}
Please run the \`sandbox\` command again in the documentation package to generate the sandbox.`;

    console.error(message);
    return dummy;
  }

  return sandboxer;
}
