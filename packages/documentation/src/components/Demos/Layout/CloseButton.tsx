import { ReactElement } from "react";
import {
  useLayoutConfig,
  isPersistentLayout,
  LayoutCloseNavigationButton,
} from "@react-md/layout";

export default function CloseButton(): ReactElement {
  const { layout } = useLayoutConfig();

  // the default behavior for this button is only to be rendered for toggleable
  // layouts, but want something focusable for temporary in these demos
  return (
    <LayoutCloseNavigationButton
      buttonType="text"
      rendered={!isPersistentLayout(layout)}
    >
      Close
    </LayoutCloseNavigationButton>
  );
}
