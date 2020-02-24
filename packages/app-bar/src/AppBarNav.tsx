/* eslint-disable react/prop-types */
import React, { forwardRef, ReactElement, Ref } from "react";
import { cnb } from "cnbuilder";
import { Button, ButtonProps } from "@react-md/button";
import { bem } from "@react-md/utils";

import { AppBarColorInherit, useInheritContext } from "./useInheritContext";

export interface AppBarNavProps extends ButtonProps, AppBarColorInherit {}

const block = bem("rmd-app-bar");

/**
 * This component is really just a simple wrapper for the `Button` component
 * that adds some additional styles for adding spacing before and after this
 * button so that it aligns to the main "keyline" of your application's
 * navigation. In simpler terms, it will make the left side of the icon in this
 * button aligns with all the other icons that appear in `ListItem`s in your
 * main navigation.
 *
 * This component is generally really only used when you want to have a
 * temporary navigation element like a hamburger menu.
 */
function AppBarNav(
  {
    className,
    children,
    inheritColor,
    theme = "clear",
    buttonType = "icon",
    ...props
  }: AppBarNavProps,
  ref?: Ref<HTMLButtonElement>
): ReactElement {
  return (
    <Button
      {...props}
      theme={theme}
      buttonType={buttonType}
      ref={ref}
      className={cnb(
        block("nav", {
          inherit: useInheritContext(inheritColor),
        }),
        className
      )}
    >
      {children}
    </Button>
  );
}

export default forwardRef<HTMLButtonElement, AppBarNavProps>(AppBarNav);
