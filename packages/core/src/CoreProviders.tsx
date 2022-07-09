import type { ReactElement, ReactNode } from "react";
import type { AppSizeQueries } from "./AppSizeProvider";
import { AppSizeProvider, DEFAULT_APP_SIZE_QUERIES } from "./AppSizeProvider";
import type { ElementInteractionMode } from "./interaction";
import {
  ElementInteractionProvider,
  UserInteractionModeProvider,
} from "./interaction";
import type { PortalContainer } from "./portal/PortalContainerProvider";
import { PortalContainerProvider } from "./portal/PortalContainerProvider";
import { SsrProvider } from "./SsrProvider";
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

  /**
   * @see {@link ElementInteractionProviderProps.disableHigherContrast}
   * @defaultValue `false`
   */
  disableHigherContrast?: boolean;

  /** @see {@link PortalContainerProvider} */
  portalContainer?: PortalContainer;

  /**
   * @defaultValue `"ltr"`
   * @see {@link DEFAULT_WRITING_DIRECTION}
   */
  defaultDir?: DefaultDir;

  /**
   * @defaultValue `false`
   */
  ssr?: boolean;

  colorSchemeMode?: ColorSchemeMode;

  children: ReactNode;
}

export function CoreProviders(props: CoreProvidersProps): ReactElement {
  const {
    ssr = false,
    appSizeQueries = DEFAULT_APP_SIZE_QUERIES,
    elementInteractionMode = "ripple",
    disableHigherContrast = false,
    defaultDir = DEFAULT_WRITING_DIRECTION,
    colorSchemeMode = "light",
    portalContainer,
    children,
  } = props;
  return (
    <SsrProvider ssr={ssr}>
      <ColorSchemeProvider mode={colorSchemeMode}>
        <WritingDirection defaultDir={defaultDir}>
          <PortalContainerProvider container={portalContainer}>
            <UserInteractionModeProvider>
              <AppSizeProvider {...appSizeQueries}>
                <ElementInteractionProvider
                  mode={elementInteractionMode}
                  disableHigherContrast={disableHigherContrast}
                >
                  {children}
                </ElementInteractionProvider>
              </AppSizeProvider>
            </UserInteractionModeProvider>
          </PortalContainerProvider>
        </WritingDirection>
      </ColorSchemeProvider>
    </SsrProvider>
  );
}
