import React, { FunctionComponent, ReactNode } from "react";
import {
  APP_BAR_OFFSET_CLASSNAME,
  APP_BAR_OFFSET_DENSE_CLASSNAME,
  APP_BAR_OFFSET_PROMINENT_CLASSNAME,
  APP_BAR_OFFSET_PROMINENT_DENSE_CLASSNAME,
} from "@react-md/app-bar";
import { useAppSizeContext } from "@react-md/sizing";
import { bem } from "@react-md/theme";
import cn from "classnames";

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

  return (
    <PhoneContext.Provider value={{ id, title }}>
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
              [APP_BAR_OFFSET_PROMINENT_DENSE_CLASSNAME]: !isPhone && prominent,
            },
            contentClassName
          )}
        >
          {children}
        </div>
      </div>
    </PhoneContext.Provider>
  );
};

const defaultProps: DefaultProps = {
  appBar: <DefaultAppBar />,
  title: "Example",
};

Phone.defaultProps = defaultProps;

export default Phone;
