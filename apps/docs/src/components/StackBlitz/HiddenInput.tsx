import { type CodePreviewProps } from "@react-md/code/CodePreview";
import { box } from "@react-md/core/box/styles";
import { type ReactElement } from "react";

import { STACKBLITZ_DEPENDENCIES } from "@/generated/stackblitz.js";

export interface HiddenInputProps extends Pick<
  CodePreviewProps,
  "disableBox" | "disablePadding" | "forceDarkMode"
> {
  name: string;
  value: string;
  demoCode: string;
  demoName: string;
  dependencies: readonly string[];
}

export function HiddenInput(props: HiddenInputProps): ReactElement {
  const {
    name,
    demoCode,
    demoName,
    disableBox,
    disablePadding,
    forceDarkMode,
    dependencies,
  } = props;

  let { value } = props;
  if (name.includes("package.json")) {
    const parsed = JSON.parse(value);
    dependencies.forEach((dependency) => {
      if (!parsed.dependencies[dependency]) {
        const version = STACKBLITZ_DEPENDENCIES[dependency];
        if (!version) {
          throw new Error(`"${value}" does not have a known version`);
        }

        parsed.dependencies[dependency] = version;
      }
    });
    value = JSON.stringify(parsed, null, 2);
  } else if (/\/App\.(t|j)sx/.test(name)) {
    value = demoCode.replace(new RegExp(demoName, "g"), "App");
  } else if (name.includes("index.html")) {
    let className = "";
    if (!disableBox) {
      className = box({ disablePadding, justify: "center" });
    }
    value = value.replace(/{{CLASS_NAME}}/, className);
  } else if (name.includes("everything.scss") && forceDarkMode) {
    value = value.replace("system", "dark");
  }

  if (/\.(t|j)sx?]$/.test(name)) {
    value = value.replace(/@\/components\//g, "./");
  }

  return <input type="hidden" name={name} value={value} />;
}
