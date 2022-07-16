import type { ElementType, HTMLAttributes, Ref } from "react";
import { forwardRef } from "react";
import type { AppBarClassNameOptions } from "./styles";
import { appBar } from "./styles";

export type CustomAppBarComponent = ElementType<
  HTMLAttributes<HTMLDivElement> & {
    ref?: Ref<HTMLDivElement>;
    className: string;
  }
>;

export interface AppBarProps
  extends HTMLAttributes<HTMLDivElement>,
    AppBarClassNameOptions {
  as?: CustomAppBarComponent;
}

export const AppBar = forwardRef<HTMLDivElement, AppBarProps>(function AppBar(
  props,
  ref
) {
  const {
    as: Component = "header",
    className,
    height = "normal",
    theme = "primary",
    fixed = false,
    fixedPosition = "top",
    scrollbarOffset = false,
    disableFixedElevation = false,
    children,
    ...remaining
  } = props;

  return (
    <Component
      {...remaining}
      className={appBar({
        theme,
        fixed,
        fixedPosition,
        disableFixedElevation,
        height,
        className,
        scrollbarOffset,
      })}
      ref={ref}
    >
      {children}
    </Component>
  );
});
