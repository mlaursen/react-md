import React, {
  forwardRef,
  ReactElement,
  ReactNode,
  Ref,
  ButtonHTMLAttributes,
  CSSProperties,
  cloneElement,
  isValidElement,
} from "react";
import { cnb } from "cnbuilder";
import { TextIconSpacing, useIcon } from "@react-md/icon";
import { useInteractionStates } from "@react-md/states";
import { bem } from "@react-md/utils";

type ButtonAttributes = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type">;

export interface ChipProps extends ButtonAttributes {
  /**
   * The theme for the button.
   */
  theme?: "outline" | "solid";

  /**
   * An optional icon to place to the left of the children. There will
   * automatically be some margin placed between this icon and the children if
   * defined.
   */
  leftIcon?: ReactNode;

  /**
   * An optional icon to place to the right of the children. There will
   * automatically be some margin placed between this icon and the children if
   * defined.
   */
  rightIcon?: ReactNode;

  /**
   * Boolean if the chip should gain elevation while the user is pressing the
   * chip with mouse, touch, or keyboard click.
   */
  raisable?: boolean;

  /**
   * An optional style to provide to the `<span>` that surrounds the `children`
   * of the chip.
   *
   * This prop will do nothing if the `disableContentWrap` prop is enabled.
   */
  contentStyle?: CSSProperties;

  /**
   * An optional className to provide to the `<span>` that surrounds the
   * `children` of the chip.
   *
   * This prop will do nothing if the `disableContentWrap` prop is enabled.
   */
  contentClassName?: string;

  /**
   * Boolean if the children should no longer be wrapped in a `<span>` that adds
   * some default styles to ellipsis and truncate the children based on the
   * chip's width.
   */
  disableContentWrap?: boolean;

  /**
   * Boolean if the chip is selected or deselected which is `undefined` by
   * default. Setting this prop to a boolean updates the chip to render a
   * selected icon to the left of the content as well as adding a darker
   * background when set to `true`. The icon will only appear once the state is
   * `true` and will transition in and out when swapped between `true` and
   * `false`.
   *
   * > See the `disableIconTransition` and `selectedIcon` props for more details
   * > about the icon behavior
   */
  selected?: boolean;

  /**
   * Boolean if the selection state should use a swatch of the primary color
   * instead of rendering a check icon and the normal background color changes.
   */
  selectedThemed?: boolean;

  /**
   * The icon to use as the `leftIcon` when the `selected` prop is a boolean.
   * When this is omitted, it will inherit the `selected` icon from the main
   * `Configuration` / `IconProvider`.
   *
   * If this is set to `null`, no icon will be rendered when the `selected` is set
   * to `"selected"` or `"unselected"`.
   *
   * If the `leftIcon` prop is not `undefined`, the `leftIcon` prop will always
   * be used instead of this prop.
   */
  selectedIcon?: ReactNode;

  /**
   * Boolean if the selected icon should not animate when the `selected` is a
   * boolean. This transition is just a simple "appear" transition with the
   * `max-width` of the icon.
   */
  disableIconTransition?: boolean;
}

const block = bem("rmd-chip");

/**
 * A chip is a simplified and condensed button component that be used to create
 * compact radio groups, checkboxes, and trigger actions. The chip only has a
 * `"solid"` and `"outline"` theme but can be raisable once clicked or
 * selectable with an inline icon. A chip also suppors rendering icons, avatars,
 * or circular progress bars to the left and right of the children.
 */
function Chip(
  {
    "aria-pressed": ariaPressed,
    className: propClassName,
    children,
    theme = "solid",
    leftIcon: propLeftIcon,
    rightIcon,
    raisable = false,
    disabled = false,
    selected,
    selectedThemed = false,
    contentStyle,
    contentClassName,
    disableContentWrap = false,
    selectedIcon: propSelectedIcon,
    disableIconTransition = false,
    ...props
  }: ChipProps,
  ref?: Ref<HTMLButtonElement>
): ReactElement {
  const { ripples, className, handlers } = useInteractionStates({
    handlers: props,
    className: propClassName,
    disabled,
    enablePressedAndRipple: raisable,
  });

  let content = children;
  if (!disableContentWrap) {
    content = (
      <span
        style={contentStyle}
        className={cnb(block("content"), contentClassName)}
      >
        {children}
      </span>
    );
  }

  let leftIcon = propLeftIcon;
  const selectable = typeof selected === "boolean";
  const selectedIcon = useIcon("selected", propSelectedIcon);
  let isHiddenIcon = false;
  if (
    selectable &&
    !selectedThemed &&
    typeof leftIcon === "undefined" &&
    selectedIcon
  ) {
    leftIcon = selectedIcon;

    if (!disableIconTransition && isValidElement(selectedIcon)) {
      isHiddenIcon = !selected;
      leftIcon = cloneElement(selectedIcon, {
        className: block("selected-icon", { visible: selected }),
      });
    } else if (disableIconTransition && !selected) {
      // don't want to render it when not selected if there's no transition
      leftIcon = null;
    }
  }

  const leading = leftIcon && !isHiddenIcon;
  const trailing = rightIcon;

  return (
    <button
      {...props}
      {...handlers}
      ref={ref}
      aria-pressed={ariaPressed ?? (!!selected || undefined)}
      type="button"
      className={cnb(
        block({
          [theme]: true,
          disabled,
          selected: !disabled && selected && !selectedThemed,
          themed: !disabled && selected && selectedThemed,
          "solid-disabled": disabled && theme === "solid",
          "leading-icon": leading && !trailing,
          "trailing-icon": trailing && !leading,
          surrounded: leading && trailing,
        }),
        className
      )}
      disabled={disabled}
    >
      <TextIconSpacing
        icon={leftIcon}
        beforeClassName={isHiddenIcon ? "" : undefined}
      >
        <TextIconSpacing icon={rightIcon} iconAfter>
          {content}
        </TextIconSpacing>
      </TextIconSpacing>
      {ripples}
    </button>
  );
}

const ForwardedChip = forwardRef<HTMLButtonElement, ChipProps>(Chip);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");
    ForwardedChip.propTypes = {
      theme: PropTypes.oneOf(["outline", "solid"]),
      disabled: PropTypes.bool,
      leftIcon: PropTypes.node,
      rightIcon: PropTypes.node,
      raisable: PropTypes.bool,
      contentStyle: PropTypes.object,
      contentClassName: PropTypes.string,
      disableContentWrap: PropTypes.bool,
      selected: PropTypes.bool,
      selectedThemed: PropTypes.bool,
    };
  } catch (e) {}
}

export default ForwardedChip;
