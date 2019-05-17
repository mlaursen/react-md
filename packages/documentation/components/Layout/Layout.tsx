import React, { FunctionComponent } from "react";
import { NestedDialogContextProvider } from "@react-md/dialog";
import { AppSizeListener, AppSizeListenerProps } from "@react-md/sizing";
import { StatesConfig, InteractionModeListener } from "@react-md/states";
import { TooltipDelayConfig } from "@react-md/tooltip";

import Combined from "./Combined";
import "./layout.scss";
import { DefaultSize } from "./useAppSizeContext";

export interface LayoutProps
  extends Required<Pick<AppSizeListenerProps, "defaultSize">> {
  title: string;
}

const Layout: FunctionComponent<LayoutProps> = ({
  children,
  title,
  defaultSize,
}) => (
  <AppSizeListener defaultSize={defaultSize}>
    <NestedDialogContextProvider>
      <InteractionModeListener>
        <StatesConfig>
          <TooltipDelayConfig>
            <DefaultSize.Provider value={defaultSize}>
              <Combined title={title}>{children}</Combined>
            </DefaultSize.Provider>
          </TooltipDelayConfig>
        </StatesConfig>
      </InteractionModeListener>
    </NestedDialogContextProvider>
  </AppSizeListener>
);

export default Layout;
