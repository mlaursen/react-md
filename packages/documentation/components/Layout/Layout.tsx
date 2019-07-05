import React, { FC } from "react";
import { NestedDialogContextProvider } from "@react-md/dialog";
import { StatesConfig, InteractionModeListener } from "@react-md/states";
import { TooltipHoverModeConfig } from "@react-md/tooltip";
import { AppSizeListener, AppSizeListenerProps } from "@react-md/utils";

import Combined from "./Combined";
import "./layout.scss";
import { DefaultSize } from "./useAppSizeContext";

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
              {pathname.startsWith("/code") ? (
                children
              ) : (
                <Combined title={title}>{children}</Combined>
              )}
            </DefaultSize.Provider>
          </TooltipHoverModeConfig>
        </StatesConfig>
      </InteractionModeListener>
    </NestedDialogContextProvider>
  </AppSizeListener>
);

export default Layout;
