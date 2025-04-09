import {
  type RenderOptions,
  type RenderResult,
  render as baseRender,
  rmdRender,
} from "@react-md/core/test-utils";
import { Fragment, type ReactElement } from "react";

import { RootProviders } from "./RootProviders.tsx";
import { rmdConfig } from "./rmdConfig.tsx";

export * from "@react-md/core/test-utils";
export * from "@react-md/core/test-utils/vitest";

export const render = (
  ui: ReactElement,
  options?: RenderOptions
): RenderResult => rmdRender(ui, { ...options, rmdConfig });

export const renderWithRootProviders = (
  ui: ReactElement,
  { wrapper: Wrapper = Fragment, ...options }: RenderOptions = {}
): RenderResult => {
  return baseRender(ui, {
    ...options,
    wrapper: ({ children }) => (
      <RootProviders>
        <Wrapper>{children}</Wrapper>
      </RootProviders>
    ),
  });
};
