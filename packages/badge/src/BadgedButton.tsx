import React, { FC, CSSProperties, ReactNode, forwardRef, Ref } from "react";
import cn from "classnames";
import { Button, ButtonProps } from "@react-md/button";
import { FontIcon } from "@react-md/icon";
import { WithForwardedRef } from "@react-md/utils";

import Badge, { BadgeProps, BadgeTheme } from "./Badge";
import isEmpty from "./isEmpty";

export interface BadgedButtonProps
  extends ButtonProps,
    Pick<BadgeProps, "disableNullOnZero"> {
  /**
   * An id to use for the button. Either this prop or the `badgeId` are required
   * for a11y when the `badgeChildren` is provided. If the `badgeId` is omitted,
   * the badge's id will be set to `${id}-badge`
   */
  id?: string;

  /**
   * An optional id for the badge. Either this prop or the `id` prop is required
   * for a11y when the `badgeChildren` is provided` to create the `aria-describedby`
   * value on the button.
   */
  badgeId?: string;

  /**
   * An optional ref for the badge. The main `ref` will be forwarded to the `button`
   * element.
   */
  badgeRef?: Ref<HTMLSpanElement>;

  /**
   * The theme to use for the badge.
   */
  badgeTheme?: BadgeTheme;

  /**
   * An optional style to apply to the badge since the `style` prop is passed down
   * to the `Button` component instead.
   */
  badgeStyle?: CSSProperties;

  /**
   * An optional className to apply to the badge since the `className` prop is
   * passed down to the `Button` component instead.
   */
  badgeClassName?: string;

  /**
   * The content to display within the button since the `children` prop is passed
   * down to the `Badge` component instead.
   */
  buttonChildren?: ReactNode;
}

type WithRef = WithForwardedRef<HTMLButtonElement>;
type DefaultProps = Required<
  Pick<
    BadgedButtonProps,
    | "aria-label"
    | "buttonType"
    | "children"
    | "buttonChildren"
    | "disableNullOnZero"
  >
>;
type WithDefaultProps = BadgedButtonProps & DefaultProps & WithRef;

/**
 * This is a small wrapper for the `Button` component that will automatically apply the
 * `aria-describedby` attribute when it has been "badged". It also adds some reasonable
 * defaults for the most common use-case for badges: notifications.
 */
const BadgedButton: FC<BadgedButtonProps & WithRef> = providedProps => {
  const {
    badgeStyle,
    badgeClassName,
    badgeRef,
    badgeId: propBadgeId,
    buttonChildren,
    badgeTheme,
    forwardedRef,
    children,
    disableNullOnZero,
    "aria-describedby": propDescribedBy,
    ...props
  } = providedProps as WithDefaultProps;

  const { id } = props;
  let badgeId = propBadgeId || "";
  if (!badgeId && id) {
    badgeId = `${id}-badge`;
  }

  let describedBy = propDescribedBy;
  if (!isEmpty(children, disableNullOnZero)) {
    describedBy = cn(describedBy, badgeId);
  }

  return (
    <Button {...props} ref={forwardedRef} aria-describedby={describedBy}>
      {buttonChildren}
      <Badge
        id={badgeId}
        ref={badgeRef}
        theme={badgeTheme}
        style={badgeStyle}
        className={badgeClassName}
        disableNullOnZero={disableNullOnZero}
      >
        {children}
      </Badge>
    </Button>
  );
};

const defaultProps: DefaultProps = {
  "aria-label": "Notifications",
  buttonType: "icon",
  buttonChildren: <FontIcon>notifications</FontIcon>,
  children: null,
  disableNullOnZero: false,
};

BadgedButton.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  BadgedButton.displayName = "BadgedButton";

  let PropTypes;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    BadgedButton.propTypes = {
      id: PropTypes.string,
      badgeId: PropTypes.string,
      badgeRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
      badgeStyle: PropTypes.object,
      badgeClassName: PropTypes.string,
      badgeTheme: PropTypes.oneOf(["primary", "secondary", "default", "clear"]),
      buttonChildren: PropTypes.node,
    };
  }
}

export default forwardRef<HTMLButtonElement, BadgedButtonProps>(
  (props, ref) => <BadgedButton {...props} forwardedRef={ref} />
);
