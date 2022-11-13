import { useSsr } from "@react-md/core";
import {
  isPersistentLayout,
  isToggleableLayout,
  useLayoutConfig,
} from "@react-md/layout";
import type { ReactElement } from "react";
import { WindowSplitter } from "./WindowSplitter";

export function NavWindowSplitter(): ReactElement | null {
  const ssr = useSsr();
  const { layout, visible } = useLayoutConfig();
  if (
    ssr ||
    (!isPersistentLayout(layout) && (!visible || !isToggleableLayout(layout)))
  ) {
    return null;
  }

  return <WindowSplitter />;
}
