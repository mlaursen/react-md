import React, { FC } from "react";
import { NestedDialogContextProvider } from "@react-md/dialog";
import { AppSizeListener, AppSizeListenerProps } from "@react-md/sizing";
import { StatesConfig, InteractionModeListener } from "@react-md/states";
import { TooltipHoverModeConfig } from "@react-md/tooltip";

import Combined from "./Combined";
import "./layout.scss";
import { DefaultSize } from "./useAppSizeContext";

export interface LayoutProps
  extends Required<Pick<AppSizeListenerProps, "defaultSize">> {
  title: string;
}

const Layout: FC<LayoutProps> = ({ children, title, defaultSize }) => (
  <AppSizeListener defaultSize={defaultSize}>
    <NestedDialogContextProvider>
      <InteractionModeListener>
        <StatesConfig>
          <TooltipHoverModeConfig>
            <DefaultSize.Provider value={defaultSize}>
              <Combined title={title}>{children}</Combined>
            </DefaultSize.Provider>
          </TooltipHoverModeConfig>
        </StatesConfig>
      </InteractionModeListener>
    </NestedDialogContextProvider>
  </AppSizeListener>
);

export default Layout;
