"use client";
import * as core from "@react-md/core";
import React, {
  isValidElement,
  useMemo,
  useRef,
  type FunctionComponent,
  type ReactElement,
} from "react";
import * as jsxRuntime from "react/jsx-runtime";
import { transform } from "sucrase";

// Note: This was hijacked from:
// - https://github.com/nihgwu/react-runner/tree/974ebc932db7b7c7d59f1b50a79aed705efbf75a/packages/react-runner
//
// I mostly wanted to understand how this works and did a few changes:
// - use the new jsx-runtime

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
export type RunnableCodeScope = Record<string, unknown> & {
  import?: Record<string, unknown>;
};

export interface DangerouslyRunnableCodeOptions {
  code: string;
  scope?: RunnableCodeScope;
}

const transformCode = (code: string): string =>
  transform(code, {
    transforms: ["jsx", "typescript", "imports"],
    production: true,
    jsxRuntime: "automatic",
  }).code.substring('"use strict";'.length);

function createElement(
  options: DangerouslyRunnableCodeOptions
): ReactElement | null {
  const { code, scope = {} } = options;
  if (!code.trim()) {
    return null;
  }

  const exports: RunnableCodeScope = {};
  const render = (value: unknown): void => {
    exports.default = value;
  };
  const transformed = transformCode(code);
  const { default: _, import: __, ...remaining } = scope;
  const imports: Record<string, unknown> = {
    react: React,
    "react/jsx-runtime": jsxRuntime,
    "@react-md/core": core,
    ...scope.import,
  };

  const functionScope: RunnableCodeScope = {
    ...remaining,
    render,
    exports,
    require: (name: string) => {
      if (!(name in imports)) {
        throw new Error(`"${name}" module is not in scope.`);
      }

      return imports[name];
    },
  };

  const parameterNames = Object.keys(functionScope);
  const parameterValues = parameterNames.map((name) => functionScope[name]);
  new Function(...parameterNames, transformed)(...parameterValues);
  const element = exports.default;
  if (!element) {
    throw new Error("Missing default export");
  }

  if (isValidElement(element)) {
    return element;
  }

  if (typeof element === "function") {
    const C = element as FunctionComponent;
    return <C />;
  }

  throw new Error("No supported exports");
}

export function useDangerouslyRunnableCode(
  options: DangerouslyRunnableCodeOptions
): readonly [element: ReactElement | null, error: Error | undefined] {
  const { code, scope } = options;
  const prevElement = useRef<ReactElement | null>(null);

  return useMemo(() => {
    let error: Error | undefined;
    let element: ReactElement | null = null;
    try {
      element = createElement({ code, scope });
      prevElement.current = element;
    } catch (e) {
      error = e instanceof Error ? e : new Error("Unknown error.");
    }

    return [element || prevElement.current, error];
  }, [code, scope]);
}
