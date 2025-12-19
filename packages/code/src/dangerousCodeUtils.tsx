"use client";

// https://github.com/nihgwu/react-runner/tree/974ebc932db7b7c7d59f1b50a79aed705efbf75a
// This is pretty much everything from there except using the new JSX transform
// and I wanted to understand why things were implemented the way they were
import React, {
  type ComponentType,
  type ReactElement,
  isValidElement,
} from "react";
import * as jsxRuntime from "react/jsx-runtime";
import { transform } from "sucrase";

import { createFakeCssModules } from "./fakeCssModules.js";
import { type LocalCodeScope, type RunnableCodeScope } from "./types.js";

export interface DangerouslyEvalCodeOptions {
  code: string;
  scope?: RunnableCodeScope;
}

function transformCode(code: string): string {
  return transform(code, {
    transforms: ["jsx", "typescript", "imports"],
    production: true,
    jsxRuntime: "automatic",
  }).code.slice('"use strict";'.length);
}

function dangerouslyEvalCode(
  options: Required<DangerouslyEvalCodeOptions>
): void {
  const { default: _, import: imports = {}, ...scope } = options.scope;
  // prettier-ignore
  const allImports: LocalCodeScope = {
    ...imports,
    react: React,
    "react/jsx-runtime": jsxRuntime,
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
        return createFakeCssModules(
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
  options: DangerouslyEvalCodeOptions
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
