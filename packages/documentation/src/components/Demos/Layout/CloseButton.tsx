import React, { FC } from "react";
import {
  useLayoutConfig,
  isPersistentLayout,
  LayoutCloseNavigationButton,
} from "@react-md/layout";

const CloseButton: FC = () => {
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
};

export default CloseButton;
