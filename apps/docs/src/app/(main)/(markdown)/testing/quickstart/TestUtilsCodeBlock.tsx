import { type ReactElement } from "react";

import { FrameworkCodeSwap } from "../FrameworkCodeSwap.js";

const BASE_CODE = `
import { Fragment, type ReactElement } from "react";
import {
  rmdRender,
  type ReactMDRenderOptions,
  type RenderResult,
} from "@react-md/core/test-utils";

import { rmdConfig } from "./rmdConfig.js";
import { MyCustomProviders } from "./MyCustomProviders.js";

export * from "@react-md/core/test-utils";
export * from "@react-md/core/test-utils/{FRAMEWORK}";

export const render = (
  ui: ReactElement,
  { wrapper: Wrapper = Fragment, ...options }: ReactMDRenderOptions = {}
): RenderResult => {
  return rmdRender(ui, {
    ...options,
    rmdConfig: {
      ...rmdConfig,
      ...options.rmdConfig,
    },
    wrapper: ({ children }) => (
      <MyCustomProviders>
        <Wrapper>{children}</Wrapper>
      </MyCustomProviders>
    ),
  });
};
`;

export default function TestUtilsCodeBlock(): ReactElement {
  return (
    <FrameworkCodeSwap
      fileName="src/test-utils.tsx"
      lang="tsx"
      code={BASE_CODE}
    />
  );
}
