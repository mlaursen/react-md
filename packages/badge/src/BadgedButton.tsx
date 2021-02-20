import React, { CSSProperties, forwardRef, ReactNode, Ref } from "react";
import cn from "classnames";
import { Button, ButtonProps } from "@react-md/button";
import { useIcon } from "@react-md/icon";

import { Badge, BadgeProps, BadgeTheme } from "./Badge";
import { isEmpty } from "./isEmpty";

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
   * for a11y when the `badgeChildren` is provided to create the
   * `aria-describedby` value on the button.
   */
  badgeId?: string;

  /**
   * An optional ref for the badge. The main `ref` will be forwarded to the
   * `button` element.
   */
  badgeRef?: Ref<HTMLSpanElement>;

  /**
   * The theme to use for the badge.
   */
  badgeTheme?: BadgeTheme;

  /**
   * An optional style to apply to the badge since the `style` prop is passed
   * down to the `Button` component instead.
   */
  badgeStyle?: CSSProperties;

  /**
   * An optional className to apply to the badge since the `className` prop is
   * passed down to the `Button` component instead.
   */
  badgeClassName?: string;

  /**
   * The content to display within the button since the `children` prop is
   * passed down to the `Badge` component instead.
   */
  buttonChildren?: ReactNode;
}

/**
 * This is a small wrapper for the `Button` component that will automatically
 * apply the `aria-describedby` attribute when it has been "badged". It also
 * adds some reasonable defaults for the most common use-case for badges:
 * notifications.
 */
export const BadgedButton = forwardRef<HTMLButtonElement, BadgedButtonProps>(
  function BadgedButton(
    {
      "aria-label": ariaLabel = "Notifications",
      badgeStyle,
      badgeClassName,
      badgeRef,
      badgeId: propBadgeId,
      buttonChildren: propButtonChildren,
      buttonType = "icon",
      badgeTheme,
      children = null,
      disableNullOnZero = false,
      "aria-describedby": propDescribedBy,
      ...props
    },
    ref
  ) {
    const { id } = props;
    const buttonChildren = useIcon("notification", propButtonChildren);

    let badgeId = propBadgeId || "";
    if (!badgeId && id) {
      badgeId = `${id}-badge`;
    }

    let describedBy = propDescribedBy;
    if (!isEmpty(children, disableNullOnZero)) {
      describedBy = cn(describedBy, badgeId);
    }

    return (
      <Button
        {...props}
        aria-label={ariaLabel}
        aria-describedby={describedBy}
        ref={ref}
        buttonType={buttonType}
      >
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
  }
);

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    BadgedButton.propTypes = {
      id: PropTypes.string,
      "aria-label": PropTypes.string,
      "aria-describedby": PropTypes.string,
      buttonType: PropTypes.oneOf(["text", "icon"]),
      children: PropTypes.node,
      disableNullOnZero: PropTypes.bool,
      badgeId: PropTypes.string,
      badgeRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
      badgeStyle: PropTypes.object,
      badgeClassName: PropTypes.string,
      badgeTheme: PropTypes.oneOf(["primary", "secondary", "default", "clear"]),
      buttonChildren: PropTypes.node,
    };
  } catch (e) {}
}
