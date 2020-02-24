import React, { FC, ReactNode, useMemo, useCallback } from "react";
import { cnb } from "cnbuilder";
import {
  APP_BAR_OFFSET_DENSE_CLASSNAME,
  APP_BAR_OFFSET_PROMINENT_DENSE_CLASSNAME,
} from "@react-md/app-bar";
import { bem, useAppSize, useToggle, PhoneOnly } from "@react-md/utils";

import ConditionalFullPageDialog, {
  ConditionalFullPageDialogProps,
} from "components/ConditionalFullPageDialog";

import "./Phone.scss";
import { PhoneContext } from "./context";
import DefaultAppBar from "./DefaultAppBar";
import StatusBar from "./StatusBar";
import ClosePhone from "./ClosePhone";

export interface PhoneConfiguration {
  /**
   * An optional app bar to use within the phone. This should normally contain the `ClosePhone`
   * component so that it can be hidden on mobile devices when the full page dialog is used.
   */
  appBar?: ReactNode;

  /**
   * The title to use for the phone. This will be passed down into the phone context so it can
   * be grabbed anywhere.
   */
  title?: ReactNode;

  /**
   * A class name to apply to the fake phone's content element.
   */
  contentClassName?: string;

  /**
   * Boolean if the phone's content should gain the stacked styles which update the content
   * to be display flex and flex-direction column. THis is great when creating a custom app
   * bar that isn't fixed to the top with position fixed.
   */
  contentStacked?: boolean;

  /**
   * Boolean if the phone's app bar should be prominent. This is used to add the required offset class names
   * to the content element.
   */
  prominent?: boolean;
}

export interface PhoneProps
  extends PhoneConfiguration,
    Pick<
      ConditionalFullPageDialogProps,
      "disableAppBar" | "disableContent" | "disableFocusOnMount"
    > {
  /**
   * An id for the phone. This is required for accessibility and quickly linking
   * to things.
   */
  id: string;

  /**
   * The content to display. This will conditionally render in a full page
   * dialog.
   */
  children: ReactNode;

  /**
   * A class name to apply to the fake phone's container element.
   */
  className?: string;

  /**
   * An optional function to call when the dialog is closed. This is useful if
   * the demo should be reset when the full page dialog is closed.
   */
  onPhoneClose?: () => void;

  /**
   * Boolean if the `appBar` should only render a status bar.
   */
  statusBar?: boolean;
}

const block = bem("phone");

const DEFAULT_APP_BAR = <DefaultAppBar />;

const Phone: FC<PhoneProps> = ({
  id,
  title = "Example",
  children,
  appBar = DEFAULT_APP_BAR,
  className,
  contentClassName,
  contentStacked: stacked = false,
  prominent,
  disableAppBar = false,
  disableContent = false,
  disableFocusOnMount = false,
  onPhoneClose,
  statusBar = false,
}) => {
  const { isPhone } = useAppSize();
  const [visible, enable, disable] = useToggle(false);
  const closePhone = useCallback(() => {
    disable();
    if (onPhoneClose) {
      onPhoneClose();
    }
  }, [onPhoneClose, disable]);

  if (visible && !isPhone) {
    closePhone();
  }

  const value = useMemo(
    () => ({
      id,
      title,
      closePhone,
    }),
    [id, title, closePhone]
  );

  return (
    <PhoneContext.Provider value={value}>
      <ConditionalFullPageDialog
        id={id}
        disabled={!isPhone}
        enable={enable}
        disable={closePhone}
        visible={visible}
        disableAppBar={disableAppBar || statusBar}
        disableContent={disableContent}
        disableFocusOnMount={disableFocusOnMount}
      >
        <div
          id={`${id}-phone`}
          className={cnb(block({ emulated: !isPhone }), className)}
        >
          {(statusBar && <StatusBar id={id} isPhone={isPhone} />) || appBar}
          <div
            id={`${id}-content`}
            className={cnb(
              block("content", { stacked }),
              {
                [APP_BAR_OFFSET_DENSE_CLASSNAME]:
                  !statusBar && appBar && !isPhone,
                [APP_BAR_OFFSET_PROMINENT_DENSE_CLASSNAME]:
                  !statusBar && appBar && !isPhone && prominent,
              },
              contentClassName
            )}
          >
            {children}
            {statusBar && (
              <PhoneOnly>
                <ClosePhone floating />
              </PhoneOnly>
            )}
          </div>
        </div>
      </ConditionalFullPageDialog>
    </PhoneContext.Provider>
  );
};

export default Phone;
