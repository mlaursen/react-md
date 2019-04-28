import React, { FunctionComponent, ReactNode, useMemo } from "react";
import cn from "classnames";
import {
  APP_BAR_OFFSET_CLASSNAME,
  APP_BAR_OFFSET_DENSE_CLASSNAME,
  APP_BAR_OFFSET_PROMINENT_CLASSNAME,
  APP_BAR_OFFSET_PROMINENT_DENSE_CLASSNAME,
} from "@react-md/app-bar";
import { useAppSizeContext } from "@react-md/sizing";
import { bem } from "@react-md/theme";
import { useToggle } from "@react-md/utils";

import ConditionalFullPageDialog from "components/ConditionalFullPageDialog";

import "./phone.scss";
import { PhoneContext } from "./context";
import DefaultAppBar from "./DefaultAppBar";

export interface PhoneProps {
  id: string;
  appBar?: ReactNode;
  title?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  prominent?: boolean;
}
type DefaultProps = Required<Pick<PhoneProps, "appBar" | "title">>;
type WithDefaultProps = PhoneProps & DefaultProps;

const block = bem("phone");

const Phone: FunctionComponent<PhoneProps> = props => {
  const {
    id,
    title,
    children,
    appBar,
    className,
    contentClassName,
    prominent,
  } = props as WithDefaultProps;
  const { isPhone } = useAppSizeContext();
  const { toggled: visible, enable, disable } = useToggle();
  if (visible && !isPhone) {
    disable();
  }

  const value = useMemo(
    () => ({
      id,
      title,
      closePhone: disable,
    }),
    [id, title, disable]
  );

  return (
    <PhoneContext.Provider value={value}>
      <ConditionalFullPageDialog
        id={id}
        disabled={!isPhone}
        enable={enable}
        disable={disable}
        visible={visible}
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
                [APP_BAR_OFFSET_CLASSNAME]: isPhone,
                [APP_BAR_OFFSET_PROMINENT_CLASSNAME]: isPhone && prominent,
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
