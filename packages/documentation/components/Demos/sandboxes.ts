/** this is a generated file from `dev-utils sandbox` */
import { IFiles } from "codesandbox-import-utils/lib/api/define";

import { upperFirst } from "utils/toTitle";

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
  "Divider/HorizontalDividers": () =>
    resolve(import("./Divider/HorizontalDividersSandbox.json")),
  "Divider/VerticalDividers": () =>
    resolve(import("./Divider/VerticalDividersSandbox.json")),
  "Divider/WithinLists": () =>
    resolve(import("./Divider/WithinListsSandbox.json")),
  "Media/ForcedAspectRatio": () =>
    resolve(import("./Media/ForcedAspectRatioSandbox.json")),
  "Media/SimpleResponsiveMedia": () =>
    resolve(import("./Media/SimpleResponsiveMediaSandbox.json")),
  "Media/WithOverlay": () => resolve(import("./Media/WithOverlaySandbox.json")),
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
    console.error(
      "Unable to find a sandbox import for the following package and demo name"
    );
    console.error("packageName: ", packageName);
    console.error("demoName: ", demoName);
    return dummy;
  }

  return sandboxer;
}
