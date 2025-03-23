"use client";

import { cnb } from "cnbuilder";
import { Fragment, type ReactNode, forwardRef } from "react";

import {
  TextIconSpacing,
  type TextIconSpacingProps,
} from "../icon/TextIconSpacing.js";
import { getIcon } from "../icon/config.js";
import { icon } from "../icon/styles.js";
import { ListItemText } from "../list/ListItemText.js";
import { getListItemHeight } from "../list/getListItemHeight.js";
import { MenuItem, type MenuItemProps } from "../menu/MenuItem.js";
import { useEnsuredId } from "../useEnsuredId.js";
import { useListboxContext } from "./ListboxProvider.js";
import { option } from "./optionStyles.js";

const noop = (): void => {
  // do nothing
};

/**
 * This icon is used while the option is unselected so that the selected and
 * unselected options have the same alignment.
 *
 * @since 6.0.0
 * @defaultValue `<span className="rmd-icon rmd-icon--svg />`
 */
export const DEFAULT_OPTION_UNSELECTED_ICON = (
  <span className={icon({ type: "svg" })} />
);

/**
 * @since 6.0.0
 */
export interface OptionSelectedIconProps {
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
   * Set this to `true` to remove selected icon behavior from the `Option`.
   *
   * @defaultValue `false`
   */
  disableSelectedIcon?: boolean;
}

/**
 * @since 6.0.0 removed the `selected` and `focused` props.
 * @since 6.0.0 Added the `value`, `selectedIcon`, `unselectedIcon`,
 * `selectedIconAfter`, and `iconSpacingProps` props.
 */
export interface OptionProps extends MenuItemProps, OptionSelectedIconProps {
  /**
   * @defaultValue `"option"`
   */
  role?: string;
  value: string | number | object;

  /**
   * An optional className to apply only while the current option is selected to
   * override any global default selected styles. It is recommended to update
   * the `react-md.$form-option-selected-styles` map first to change selected
   * style globally and then any one-off customizations through this prop.
   *
   * @example Global Change
   * ```scss
   * @use "@react-md/core" with (
   *   // these are the defaults
   *   $form-option-selected-styles: (
   *     --rmd-icon-color: currentcolor,
   *     background-color: colors.$blue-900,
   *     color: colors.$white,
   *   ),
   *
   *   // so if you wanted to remove the styles globally
   *   $form-option-selected-styles: (),
   * );
   * ```
   *
   * This really results in something like:
   * ```ts
   * className="rmd-list-item ... rmd-menu-item ... rmd-option rmd-option--selected ${selectedClassName}"
   * ```
   */
  selectedClassName?: string;

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
 * @see {@link https://next.react-md.dev/components/select|Select Demos}
 * @since 6.0.0 removed the `selected` and `focused` props.
 * @since 6.0.0 Added the `value`, `selectedIcon`, `unselectedIcon`,
 * `selectedIconAfter`, `iconSpacingProps`, and `selectedClassName` props.
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
      selectedClassName,
      selectedIcon: propSelectedIcon,
      unselectedIcon: propUnselectedIcon,
      selectedIconAfter: propSelectedIconAfter,
      disableSelectedIcon: propDisableSelectedIcon,
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
    const {
      selectOption,
      isOptionSelected,
      disableSelectedIcon: contextDisableSelectedIcon,
      selectedIcon: contextSelectedIcon,
      unselectedIcon: contextUnselectedIcon,
      selectedIconAfter: contextSelectedIconAfter,
    } = useListboxContext();
    const selectedIconAfter = propSelectedIconAfter ?? contextSelectedIconAfter;
    const disableSelectedIcon =
      propDisableSelectedIcon ?? contextDisableSelectedIcon;
    const selected = isOptionSelected(value);
    const selectedIcon = getIcon(
      "selected",
      disableSelectedIcon ? null : (propSelectedIcon ?? contextSelectedIcon)
    );
    const unselectedIcon = disableSelectedIcon
      ? null
      : (propUnselectedIcon ??
        contextUnselectedIcon ??
        DEFAULT_OPTION_UNSELECTED_ICON);
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
          selectOption(value);
        }}
        className={option({
          icon: !!icon,
          selected,
          selectedClassName,
          className,
        })}
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
