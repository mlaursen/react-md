import { useState } from "react";
import type { UseStateInitializer, UseStateSetter } from "../types";
import type {
  HoverModeConfigurationOptions,
  HoverModeFlowImplementation,
} from "./useControlledHoverMode";
import { useControlledHoverMode } from "./useControlledHoverMode";

/**
 * @remarks \@since 6.0.0
 */
export interface HoverModeOptions extends HoverModeConfigurationOptions {
  defaultVisible?: UseStateInitializer<boolean>;
}

/**
 * @remarks \@since 6.0.0
 */
export interface HoverModeImplementation extends HoverModeFlowImplementation {
  visible: boolean;
  setVisible: UseStateSetter<boolean>;
}

/**
 * @remarks
 * \@since 2.8.0
 * \@since 5.0.0 This hook no longer returns `handlers` or
 * `stickyHandlers` and does not hide when an element on the page is clicked.
 * \@since 6.0.0 Requires passing the custom hover mode context to
 * work.
 */
export function useHoverMode(
  options: HoverModeOptions
): HoverModeImplementation {
  const { defaultVisible = false, ...configuration } = options;

  const [visible, setVisible] = useState(defaultVisible);
  const implementation = useControlledHoverMode({
    setVisible,
    ...configuration,
  });

  return {
    visible,
    setVisible,
    ...implementation,
  };
}
