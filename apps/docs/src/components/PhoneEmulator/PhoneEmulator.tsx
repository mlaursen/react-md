import { cnb } from "cnbuilder";
import type { HTMLAttributes, ReactElement, ReactNode } from "react";
import { ClosePhoneEmulatorButton } from "./ClosePhoneEmulatorButton";
import { ConditionalFullPageDialog } from "./ConditionalFullPageDialog";
import { DefaultAppBar } from "./DefaultAppBar";
import styles from "./PhoneEmulator.module.scss";
import type { PhoneEmulatorProviderOptions } from "./PhoneEmulatorProvider";
import {
  PhoneEmulatorProvider,
  usePhoneEmulatorProvider,
} from "./PhoneEmulatorProvider";
import { StatusBar } from "./StatusBar";

const DEFAULT_APP_BAR = <DefaultAppBar />;

export interface PhoneEmulatorProps
  extends HTMLAttributes<HTMLDivElement>,
    PhoneEmulatorProviderOptions {
  /**
   * @defaultValue `<DefaultAppBar />`
   */
  appBar?: ReactNode;

  /**
   * @defaultValue `false`
   */
  statusBar?: boolean;
  contentClassName?: string;
}

export function PhoneEmulator(props: PhoneEmulatorProps): ReactElement {
  const {
    className,
    contentClassName,
    appBar = DEFAULT_APP_BAR,
    statusBar = false,
    onPhoneClose,
    children,
    ...remaining
  } = props;

  const { isPhone, emulatorContext } = usePhoneEmulatorProvider({
    onPhoneClose,
  });

  return (
    <PhoneEmulatorProvider value={emulatorContext}>
      <ConditionalFullPageDialog disabled={!isPhone}>
        <div {...remaining} className={cnb(styles.container, className)}>
          {(statusBar && <StatusBar />) || appBar}
          <div className={cnb(styles.content, contentClassName)}>
            {children}
            {statusBar && (
              <ClosePhoneEmulatorButton
                floating="bottom-right"
                className={styles.phoneOnly}
              />
            )}
          </div>
        </div>
      </ConditionalFullPageDialog>
    </PhoneEmulatorProvider>
  );
}
