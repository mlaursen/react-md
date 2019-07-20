import React, { FC, ReactNode, useMemo, useCallback } from "react";
import cn from "classnames";
import {
  APP_BAR_OFFSET_DENSE_CLASSNAME,
  APP_BAR_OFFSET_PROMINENT_DENSE_CLASSNAME,
} from "@react-md/app-bar";
import { bem } from "@react-md/theme";
import { useToggle } from "@react-md/utils";

import ConditionalFullPageDialog, {
  ConditionalFullPageDialogProps,
} from "components/ConditionalFullPageDialog";
import useAppSizeContext from "components/Layout/useAppSizeContext";

import "./Phone.scss";
import { PhoneContext } from "./context";
import DefaultAppBar from "./DefaultAppBar";

export interface PhoneProps
  extends Pick<
    ConditionalFullPageDialogProps,
    "disableAppBar" | "disableContent"
  > {
  /**
   * An id for the phone. This is required for accessibility and quickly linking to things.
   */
  id: string;

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
   * The content to display. This will conditionally render in a full page dialog.
   */
  children: ReactNode;

  /**
   * A class name to apply to the fake phone's container element.
   */
  className?: string;

  /**
   * A class name to apply to the fake phone's content element.
   */
  contentClassName?: string;

  /**
   * Boolean if the phone's app bar should be prominent. This is used to add the required offset class names
   * to the content element.
   */
  prominent?: boolean;

  /**
   * An optional function to call when the dialog is closed. This is useful if the demo should be reset
   * when the full page dialog is closed.
   */
  onPhoneClose?: () => void;
}
type DefaultProps = Required<Pick<PhoneProps, "appBar" | "title">>;
type WithDefaultProps = PhoneProps & DefaultProps;

const block = bem("phone");

const Phone: FC<PhoneProps> = props => {
  const {
    id,
    title,
    children,
    appBar,
    className,
    contentClassName,
    prominent,
    disableAppBar,
    disableContent,
    onPhoneClose,
  } = props as WithDefaultProps;
  const { isPhone } = useAppSizeContext();
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
        disableAppBar={disableAppBar}
        disableContent={disableContent}
      >
        <div
          id={`${id}-phone`}
          className={cn(block({ emulated: !isPhone }), className)}
        >
          {appBar}
          <div
            id={`${id}-content`}
            className={cn(
              block("content"),
              {
                [APP_BAR_OFFSET_DENSE_CLASSNAME]: !isPhone,
                [APP_BAR_OFFSET_PROMINENT_DENSE_CLASSNAME]:
                  !isPhone && prominent,
              },
              contentClassName
            )}
          >
            {children}
          </div>
        </div>
      </ConditionalFullPageDialog>
    </PhoneContext.Provider>
  );
};

const defaultProps: DefaultProps = {
  appBar: <DefaultAppBar />,
  title: "Example",
};

Phone.defaultProps = defaultProps;

export default Phone;
