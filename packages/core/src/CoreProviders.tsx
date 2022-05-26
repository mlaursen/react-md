import type { ReactElement, ReactNode } from "react";
import type { AppSizeQueries } from "./AppSizeProvider";
import { AppSizeProvider, DEFAULT_APP_SIZE_QUERIES } from "./AppSizeProvider";
import type { ElementInteractionMode } from "./interaction";
import {
  ElementInteractionModeProvider,
  UserInteractionModeProvider,
} from "./interaction";
import type { PortalContainer } from "./portal/PortalContainerProvider";
import { PortalContainerProvider } from "./portal/PortalContainerProvider";
import type { ColorSchemeMode } from "./theme/ColorSchemeProvider";
import { ColorSchemeProvider } from "./theme/ColorSchemeProvider";
import type { DefaultDir } from "./typography/WritingDirection";
import {
  DEFAULT_WRITING_DIRECTION,
  WritingDirection,
} from "./typography/WritingDirection";

export interface CoreProvidersProps {
  /**
   * @defaultValue `DEFAULT_APP_SIZE_QUERIES`
   * @see {@link DEFAULT_APP_SIZE_QUERIES}
   */
  appSizeQueries?: Readonly<AppSizeQueries>;

  /**
   * @defaultValue `"ripple"`
   */
  elementInteractionMode?: ElementInteractionMode;

  /** @see {@link PortalContainerProvider} */
  portalContainer?: PortalContainer;

  /**
   * @defaultValue `"ltr"`
   * @see {@link DEFAULT_WRITING_DIRECTION}
   */
  defaultDir?: DefaultDir;

  colorSchemeMode?: ColorSchemeMode;

  children: ReactNode;
}

export function CoreProviders(props: CoreProvidersProps): ReactElement {
  const {
    appSizeQueries = DEFAULT_APP_SIZE_QUERIES,
    elementInteractionMode = "ripple",
    defaultDir = DEFAULT_WRITING_DIRECTION,
    colorSchemeMode = "light",
    portalContainer,
    children,
  } = props;
  return (
    <ColorSchemeProvider mode={colorSchemeMode}>
      <WritingDirection defaultDir={defaultDir}>
        <PortalContainerProvider container={portalContainer}>
          <UserInteractionModeProvider>
            <AppSizeProvider {...appSizeQueries}>
              <ElementInteractionModeProvider mode={elementInteractionMode}>
                {children}
              </ElementInteractionModeProvider>
            </AppSizeProvider>
          </UserInteractionModeProvider>
        </PortalContainerProvider>
      </WritingDirection>
    </ColorSchemeProvider>
  );
}
