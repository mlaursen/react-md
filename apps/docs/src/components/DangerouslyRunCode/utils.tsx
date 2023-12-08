// https://github.com/nihgwu/react-runner/tree/974ebc932db7b7c7d59f1b50a79aed705efbf75a
// This is pretty much everything from there except using the new JSX transform
// and I wanted to understand why things were implemented the way they were
"use client";
import * as core from "@react-md/core";
import BrightnessHighIcon from "@react-md/material-icons/BrightnessHighIcon";
import BrightnessLowIcon from "@react-md/material-icons/BrightnessLowIcon";
import CancelOutlinedIcon from "@react-md/material-icons/CancelOutlinedIcon";
import CelebrationOutlinedIcon from "@react-md/material-icons/CelebrationOutlinedIcon";
import ChevronLeftIcon from "@react-md/material-icons/ChevronLeftIcon";
import ChevronRightIcon from "@react-md/material-icons/ChevronRightIcon";
import CloseIcon from "@react-md/material-icons/CloseIcon";
import CloudUploadOutlinedIcon from "@react-md/material-icons/CloudUploadOutlinedIcon";
import ContentCopyOutlinedIcon from "@react-md/material-icons/ContentCopyOutlinedIcon";
import ContentCutOutlinedIcon from "@react-md/material-icons/ContentCutOutlinedIcon";
import ContentPasteOutlinedIcon from "@react-md/material-icons/ContentPasteOutlinedIcon";
import EmailIcon from "@react-md/material-icons/EmailIcon";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import FolderIcon from "@react-md/material-icons/FolderIcon";
import InfoOutlineIcon from "@react-md/material-icons/InfoOutlineIcon";
import KeyboardArrowDownIcon from "@react-md/material-icons/KeyboardArrowDownIcon";
import MenuIcon from "@react-md/material-icons/MenuIcon";
import MoodBadOutlinedIcon from "@react-md/material-icons/MoodBadOutlinedIcon";
import MoodOutlinedIcon from "@react-md/material-icons/MoodOutlinedIcon";
import MoreVertOutlinedIcon from "@react-md/material-icons/MoreVertOutlinedIcon";
import NotificationsOutlinedIcon from "@react-md/material-icons/NotificationsOutlinedIcon";
import PauseIcon from "@react-md/material-icons/PauseIcon";
import PhoneIcon from "@react-md/material-icons/PhoneIcon";
import PlayArrowIcon from "@react-md/material-icons/PlayArrowIcon";
import RadioButtonCheckedIcon from "@react-md/material-icons/RadioButtonCheckedIcon";
import RadioButtonUncheckedIcon from "@react-md/material-icons/RadioButtonUncheckedIcon";
import SearchIcon from "@react-md/material-icons/SearchIcon";
import SocialDistanceOutlinedIcon from "@react-md/material-icons/SocialDistanceOutlinedIcon";
import StarIcon from "@react-md/material-icons/StarIcon";
import VolumeOffOutlinedIcon from "@react-md/material-icons/VolumeOffOutlinedIcon";
import VolumeUpOutlinedIcon from "@react-md/material-icons/VolumeUpOutlinedIcon";
import * as cnbuilder from "cnbuilder";
import React, {
  isValidElement,
  type ComponentType,
  type ReactElement,
} from "react";
import * as jsxRuntime from "react/jsx-runtime";
import { transform } from "sucrase";
import { createFakeScssModules } from "../../utils/fakeScssModules.js";

export type GlobalCodeScope = Record<string, unknown>;
export type LocalCodeScope = Record<string, unknown>;

/**
 * Everything defined in this object will be part of the global scope. If there
 * are specific imports for the file, they should be added under `imports`
 *
 * i.e.
 * ```ts
 * import Prism from "prismjs";
 * import * as someLibrary from "some-library";
 *
 * const scope: RunnableCodeScope = {
 *   Prism,
 *   import: {
 *     "some-library": someLibrary,
 *   },
 * };
 *
 * // no Prism import required since it's in the global scope.
 * const code = `
 * import { part } from "some-library";
 *
 * Prism.highlightElement(document.getElementById('root'));
 *
 * part();
 * `;
 * ```
 */
export type RunnableCodeScope = GlobalCodeScope & { import?: LocalCodeScope };

export interface DangerouslyRunCodeOptions {
  code: string;
  scope?: RunnableCodeScope;
}

function transformCode(code: string): string {
  return transform(code, {
    transforms: ["jsx", "typescript", "imports"],
    production: true,
    jsxRuntime: "automatic",
  }).code.substring('"use strict";'.length);
}

function dangerouslyEvalCode(
  options: Required<DangerouslyRunCodeOptions>
): void {
  const { default: _, import: imports = {}, ...scope } = options.scope;
  // prettier-ignore
  const allImports: LocalCodeScope = {
    ...imports,
    react: React,
    "react/jsx-runtime": jsxRuntime,
    "@react-md/core": core,
    cnbuilder,
    // I need a way to figure out how to correctly pass the scope down here. I can't pass functions
    // down from server components to client components, so it might need to be a script. For now,
    // just add any imports that are required.
    "@react-md/material-icons/BrightnessHighIcon": BrightnessHighIcon,
    "@react-md/material-icons/BrightnessLowIcon": BrightnessLowIcon,
    "@react-md/material-icons/CancelOutlinedIcon": CancelOutlinedIcon,
    "@react-md/material-icons/CelebrationOutlinedIcon": CelebrationOutlinedIcon,
    "@react-md/material-icons/ChevronLeftIcon": ChevronLeftIcon,
    "@react-md/material-icons/ChevronRightIcon": ChevronRightIcon,
    "@react-md/material-icons/CloseIcon": CloseIcon,
    "@react-md/material-icons/CloudUploadOutlinedIcon": CloudUploadOutlinedIcon,
    "@react-md/material-icons/ContentCopyOutlinedIcon": ContentCopyOutlinedIcon,
    "@react-md/material-icons/ContentCutOutlinedIcon": ContentCutOutlinedIcon,
    "@react-md/material-icons/ContentPasteOutlinedIcon": ContentPasteOutlinedIcon,
    "@react-md/material-icons/EmailIcon": EmailIcon,
    "@react-md/material-icons/FavoriteIcon": FavoriteIcon,
    "@react-md/material-icons/FolderIcon": FolderIcon,
    "@react-md/material-icons/InfoOutlineIcon": InfoOutlineIcon,
    "@react-md/material-icons/KeyboardArrowDownIcon": KeyboardArrowDownIcon,
    "@react-md/material-icons/MenuIcon": MenuIcon,
    "@react-md/material-icons/MoodBadOutlinedIcon": MoodBadOutlinedIcon,
    "@react-md/material-icons/MoodOutlinedIcon": MoodOutlinedIcon,
    "@react-md/material-icons/MoreVertOutlinedIcon": MoreVertOutlinedIcon,
    "@react-md/material-icons/NotificationsOutlinedIcon": NotificationsOutlinedIcon,
    "@react-md/material-icons/PauseIcon": PauseIcon,
    "@react-md/material-icons/PhoneIcon": PhoneIcon,
    "@react-md/material-icons/PlayArrowIcon": PlayArrowIcon,
    "@react-md/material-icons/RadioButtonCheckedIcon": RadioButtonCheckedIcon,
    "@react-md/material-icons/RadioButtonUncheckedIcon": RadioButtonUncheckedIcon,
    "@react-md/material-icons/SearchIcon": SearchIcon,
    "@react-md/material-icons/SocialDistanceOutlinedIcon": SocialDistanceOutlinedIcon,
    "@react-md/material-icons/StarIcon": StarIcon,
    "@react-md/material-icons/VolumeOffOutlinedIcon": VolumeOffOutlinedIcon,
    "@react-md/material-icons/VolumeUpOutlinedIcon": VolumeUpOutlinedIcon,
  };
  const functionScope: RunnableCodeScope = {
    // sucrase will transform all import statements into `require` to work in
    // the browser. So to be able to import code in other files or packages,
    // the require statement should be mocked to lookup valid imports from
    // above.
    //
    // If a package isn't defined in the `imports` scope, there will be a
    // runtime error about the module cannot be found.
    //
    // This unfortunately doesn't work well with RSC since functions can't be
    // passed to client components.
    require: (moduleName: string): unknown => {
      if (moduleName.endsWith(".module.scss")) {
        return createFakeScssModules(
          moduleName.replace("./", "").replace(".module.scss", "")
        );
      }

      const mod = allImports[moduleName];
      if (!mod) {
        throw new Error(`Module not found: "${moduleName}"`);
      }
      return mod;
    },
    ...scope,
  };

  const parameterNames = Object.keys(functionScope);
  const parameters = parameterNames.map((key) => functionScope[key]);

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function
  // So this is a "safer" version of `eval` that generates and runs a function by:
  // - creating a function with the provided code and providing all the locally
  //   scoped variables that are required for the code to run. These are the
  //   `...parameterNames` that are provided before the code.
  // - once the function has been created, execute it and provide all the
  //   values for the parameter names.
  new Function(...parameterNames, options.code)(...parameters);
}

export function dangerouslyCreateElement(
  options: DangerouslyRunCodeOptions
): ReactElement | null {
  const { code, scope } = options;
  if (!code.trim()) {
    return null;
  }

  const fileExports: RunnableCodeScope = {};
  const render = (value: unknown): void => {
    fileExports.default = value;
  };
  dangerouslyEvalCode({
    code: transformCode(code),
    scope: { render, ...scope, exports: fileExports },
  });

  const result = fileExports.default;
  if (!result) {
    throw new Error("Missing default export for the demo");
  }

  if (isValidElement(result)) {
    return result;
  }

  if (typeof result === "function") {
    const Component = result as ComponentType;
    return <Component />;
  }

  return null;
}

export function importCode(
  code: string,
  scope?: RunnableCodeScope
): RunnableCodeScope {
  const exports: RunnableCodeScope = {};
  dangerouslyEvalCode({
    code: transformCode(code),
    scope: { ...scope, exports },
  });

  return exports;
}
