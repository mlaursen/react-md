import React, { FC, ReactElement } from "react";
import { StatesConfig } from "@react-md/states";
import { TooltipHoverModeConfig } from "@react-md/tooltip";
import {
  AppSize,
  AppSizeListener,
  InteractionModeListener,
} from "@react-md/utils";
import {
  render as baseRender,
  RenderOptions,
  RenderResult,
} from "@testing-library/react";

export * from "@testing-library/react";

export interface CustomOptions {
  defaultAppSize?: AppSize;
}

export interface CustomRenderOptions extends CustomOptions, RenderOptions {}

const AllProviders: (options: CustomOptions) => FC = ({
  defaultAppSize,
}: CustomOptions) => ({ children }) => (
  <AppSizeListener defaultSize={defaultAppSize}>
    <InteractionModeListener>
      <StatesConfig>
        <TooltipHoverModeConfig>{children}</TooltipHoverModeConfig>
      </StatesConfig>
    </InteractionModeListener>
  </AppSizeListener>
);

// it would be better do do this in a test setup script, but since
// this is required to run any tests, I'll do it here instead.

interface CustomRenderResult extends RenderResult {
  getById<E extends HTMLElement = HTMLElement>(id: string): E;
}

export const render = (
  children: ReactElement,
  { defaultAppSize, ...options }: CustomRenderOptions = {}
): CustomRenderResult => {
  const result = baseRender(children, {
    wrapper: AllProviders({ defaultAppSize }),
    ...options,
  });

  const getById = <E extends HTMLElement = HTMLElement>(id: string): E => {
    const el = document.getElementById(id);
    if (!el) {
      throw new Error(`Element not found with id: "${id}"`);
    }

    return el as E;
  };

  return {
    ...result,
    getById,
  };
};
