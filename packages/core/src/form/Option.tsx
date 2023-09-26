"use client";
import { cnb } from "cnbuilder";
import { forwardRef, Fragment, type ReactNode } from "react";
import { getIcon } from "../icon/iconConfig.js";
import { icon } from "../icon/styles.js";
import {
  TextIconSpacing,
  type TextIconSpacingProps,
} from "../icon/TextIconSpacing.js";
import { getListItemHeight } from "../list/getListItemHeight.js";
import { ListItemText } from "../list/ListItemText.js";
import { MenuItem, type MenuItemProps } from "../menu/MenuItem.js";
import { useEnsuredId } from "../useEnsuredId.js";
import { option } from "./optionStyles.js";
import { useListboxContext } from "./useListboxProvider.js";
import { triggerManualChangeEvent } from "./utils.js";

const noop = (): void => {
  // do nothing
};

/**
 * This icon is used while the option is unselected so that the selected and
 * unselected options have the same alignment.
 *
 * @remarks \@since 6.0.0
 */
export const DEFAULT_OPTION_UNSELECTED_ICON = (
  <span className={icon({ type: "svg" })} />
);

/**
 * @remarks
 * \@since 6.0.0 removed the `selected` and `focused` props.
 * \@since 6.0.0 Added the `value`, `selectedIcon`, `unselectedIcon`,
 * `selectedIconAfter`, and `iconSpacingProps` props.
 */
export interface OptionProps extends MenuItemProps {
  /**
   * @defaultValue `"option"`
   */
  role?: string;

  value: string | number;

  /**
   * @defaultValue `getIcon("selected")`
   */
  selectedIcon?: ReactNode;

  /**
   * @see {@link DEFAULT_OPTION_UNSELECTED_ICON}
   * @defaultValue `<span className="rmd-icon rmd-icon--svg" />`
   */
  unselectedIcon?: ReactNode;

  /**
   * Set this to `true` of the {@link selectedIcon}/{@link unselectedIcon}
   * should appear as the {@link rightAddon} instead of the {@link leftAddon}.
   *
   * @defaultValue `false`
   */
  selectedIconAfter?: boolean;

  /**
   * Since the `selectedIcon`/`unselectedIcon` are rendered as
   * `leftAddon`/`rightAddon`, the provided `leftAddon`/`rightAddon` will be
   * wrapped in the {@link TextIconSpacing} component to maintain the correct
   * spacing. You can use this prop to provide any additional configuration to
   * the spacing.
   *
   * @example
   * ```tsx
   * <Option
   *   leftAddon={<Avatar>A</Avatar>}
   *   leftAddonType="avatar"
   *   value={0}
   *   textIconSpacingProps={{
   *     beforeClassName: "my-custom-class-name",
   *   }}
   * >
   *   Some Content
   * </Option>
   * ```
   */
  textIconSpacingProps?: Omit<TextIconSpacingProps, "icon" | "children">;
}

/**
 * **Client Component**
 *
 * This component is a wrapper around the {@link MenuItem} to implement custom
 * select option behavior.
 *
 * @remarks
 * \@since 6.0.0 removed the `selected` and `focused` props.
 * \@since 6.0.0 Added the `value`, `selectedIcon`, `unselectedIcon`,
 * `selectedIconAfter`, and `iconSpacingProps` props.
 */
export const Option = forwardRef<HTMLLIElement, OptionProps>(
  function Option(props, ref) {
    const {
      id: propId,
      role = "option",
      value,
      children: propChildren,
      onClick = noop,
      className,
      selectedIcon: propSelectedIcon,
      unselectedIcon: propUnselectedIcon,
      selectedIconAfter = false,
      textIconSpacingProps,
      leftAddon: propLeftAddon,
      leftAddonType,
      leftAddonClassName,
      rightAddon: propRightAddon,
      rightAddonType,
      rightAddonClassName,
      secondaryText,
      height: propHeight,
      disableTextChildren: propDisableTextChildren,
      ...remaining
    } = props;

    const id = useEnsuredId(propId, "option");
    const { inputRef, currentValue, disableSelectedIcon } = useListboxContext();
    const selected = value === currentValue;
    const selectedIcon = getIcon(
      "selected",
      disableSelectedIcon ? null : propSelectedIcon
    );
    const unselectedIcon = disableSelectedIcon
      ? null
      : propUnselectedIcon ?? DEFAULT_OPTION_UNSELECTED_ICON;
    const icon = selected ? selectedIcon : unselectedIcon;

    let leftAddon = propLeftAddon;
    let rightAddon = propRightAddon;
    let children = propChildren;
    let disableTextChildren = propDisableTextChildren;
    if (!selectedIconAfter && icon) {
      leftAddon = icon;
      if (propLeftAddon) {
        disableTextChildren = true;
        const Wrapper = propDisableTextChildren ? Fragment : ListItemText;

        children = (
          <TextIconSpacing {...textIconSpacingProps} icon={propLeftAddon}>
            <Wrapper>{children}</Wrapper>
          </TextIconSpacing>
        );
      }
    } else if (icon) {
      rightAddon = icon;
      if (propRightAddon) {
        disableTextChildren = true;
        const Wrapper = propDisableTextChildren ? Fragment : ListItemText;

        children = (
          <TextIconSpacing {...textIconSpacingProps} icon={propRightAddon}>
            <Wrapper>{children}</Wrapper>
          </TextIconSpacing>
        );
      }
    }

    const height = getListItemHeight({
      height: propHeight,
      leftAddon: leftAddon === icon ? null : leftAddon,
      leftAddonType,
      rightAddon: rightAddon === icon ? null : rightAddon,
      rightAddonType,
      secondaryText,
    });

    return (
      <MenuItem
        {...remaining}
        aria-selected={selected || undefined}
        id={id}
        ref={ref}
        role={role}
        onClick={(event) => {
          onClick(event);
          triggerManualChangeEvent(inputRef.current, value);
        }}
        className={option({ icon: !!icon, selected, className })}
        secondaryText={secondaryText}
        height={height}
        leftAddon={leftAddon}
        leftAddonType={leftAddonType}
        leftAddonClassName={cnb(
          leftAddon === icon && "rmd-option__icon",
          leftAddonClassName
        )}
        rightAddon={rightAddon}
        rightAddonType={rightAddonType}
        rightAddonClassName={cnb(
          rightAddon === icon && "rmd-option__icon",
          rightAddonClassName
        )}
        disableTextChildren={disableTextChildren}
      >
        {children}
      </MenuItem>
    );
  }
);
