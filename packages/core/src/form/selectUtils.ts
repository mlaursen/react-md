import { Children, type ReactNode, isValidElement } from "react";

import { type MenuItemProps } from "../menu/MenuItem.js";

/**
 * @internal
 * @since 6.0.0
 */
export interface SelectOption<
  Value extends string | number = string,
> extends MenuItemProps {
  value: Value;
}

/**
 * @internal
 * @since 6.0.0
 */
function getLabelFromChildren(children: ReactNode): string {
  if (!children) {
    return "";
  }

  if (typeof children === "string" || typeof children === "number") {
    return `${children}`;
  }

  if (isValidElement<{ children: ReactNode; hidden?: boolean }>(children)) {
    if (children.props.hidden) {
      return "";
    }

    return getLabelFromChildren(children.props.children);
  }

  const childList = Children.toArray(children);
  for (const child of childList) {
    if (typeof child === "string" || typeof child === "number") {
      return `${child}`[0].toUpperCase();
    }

    if (
      isValidElement<{ children: ReactNode; hidden?: boolean }>(child) &&
      !child.props.hidden
    ) {
      return getLabelFromChildren(child.props.children);
    }
  }

  return "";
}

/**
 * @internal
 * @since 6.0.0
 */
interface ExtractedOptions<Value extends string | number> {
  options: readonly Value[];
  currentOption: SelectOption<Value> | undefined;
}

/**
 * @internal
 * @since 6.0.0
 */
export function extractOptionsFromChildren<Value extends string | number>(
  children: ReactNode,
  currentValue: Value | undefined
): ExtractedOptions<Value> {
  let currentOption: SelectOption<Value> | undefined;

  const options: Value[] = [];
  const searchValues: string[] = [];
  Children.forEach(children, (child) => {
    if (!isValidElement<SelectOption<Value>>(child)) {
      return;
    }

    const { value, disabled, children } = child.props;
    if (value !== undefined) {
      if (
        value === currentValue ||
        (!currentOption && currentValue === undefined)
      ) {
        currentOption = child.props;
      }

      if (!disabled) {
        options.push(child.props.value);
        searchValues.push(getLabelFromChildren(children));
      }
    } else if (children) {
      const result = extractOptionsFromChildren(children, currentValue);
      if (!currentOption) {
        ({ currentOption } = result);
      }

      options.push(...result.options);
    }
  });

  return {
    options,
    currentOption,
  };
}
