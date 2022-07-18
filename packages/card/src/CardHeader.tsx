import type { PropsWithRef } from "@react-md/core";
import type { HTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import type { CardHeaderClassNameOptions } from "./styles";
import { cardHeader, cardHeaderContent } from "./styles";

export interface CardHeaderProps
  extends HTMLAttributes<HTMLDivElement>,
    CardHeaderClassNameOptions {
  afterAddon?: ReactNode;
  beforeAddon?: ReactNode;
  contentProps?: PropsWithRef<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  function CardHeader(props, ref) {
    const {
      className,
      children,
      beforeAddon,
      afterAddon,
      contentProps,
      ...remaining
    } = props;

    return (
      <header
        {...remaining}
        ref={ref}
        className={cardHeader({
          className,
          addonBefore: !!beforeAddon,
          addonAfter: !!afterAddon,
        })}
      >
        {beforeAddon}
        <div
          {...contentProps}
          className={cardHeaderContent({ className: contentProps?.className })}
        >
          {children}
        </div>
        {afterAddon}
      </header>
    );
  }
);
