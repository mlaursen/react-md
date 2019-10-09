import React, { FC } from "react";
import { NestedDialogContextProvider } from "@react-md/dialog";
import { StatesConfig } from "@react-md/states";
import { TooltipHoverModeConfig } from "@react-md/tooltip";
import {
  AppSizeListener,
  AppSizeListenerProps,
  InteractionModeListener,
} from "@react-md/utils";

import { TOCVisibilityProvider } from "components/TableOfContents/VisibilityContext";

import Combined from "./Combined";
import "./Layout.scss";
import { DefaultSize } from "./useAppSizeContext";
import SkipToMainContent from "./SkipToMainContent";

export interface LayoutProps
  extends Required<Pick<AppSizeListenerProps, "defaultSize">> {
  title: string;
  pathname: string;
}

const Layout: FC<LayoutProps> = ({
  children,
  title,
  pathname,
  defaultSize,
}) => (
  <AppSizeListener defaultSize={defaultSize}>
    <NestedDialogContextProvider>
      <InteractionModeListener>
        <StatesConfig>
          <TooltipHoverModeConfig>
            <DefaultSize.Provider value={defaultSize}>
              <TOCVisibilityProvider pathname={pathname}>
                <SkipToMainContent />
                <Combined title={title}>{children}</Combined>
              </TOCVisibilityProvider>
            </DefaultSize.Provider>
          </TooltipHoverModeConfig>
        </StatesConfig>
      </InteractionModeListener>
    </NestedDialogContextProvider>
  </AppSizeListener>
);

export default Layout;
