import type { MenuItemProps } from "@react-md/menu";
import type { ReactNode } from "react";
import { Children, isValidElement } from "react";

/**
 * @internal
 * @remarks \@since 6.0.0
 */
export interface SelectOption<Value extends string | number = string>
  extends MenuItemProps {
  value: Value;
}

/**
 * @internal
 * @remarks \@since 6.0.0
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
 * @remarks \@since 6.0.0
 */
interface ExtractedOptions<Value extends string | number> {
  options: readonly SelectOption<Value>[];
  currentOption: SelectOption<Value> | undefined;
  searchValues: readonly string[];
  currentIndex: number;
}

/**
 * @internal
 * @remarks \@since 6.0.0
 */
export function extractOptionsFromChildren<Value extends string | number>(
  children: ReactNode,
  currentValue: Value | undefined
): ExtractedOptions<Value> {
  let currentOption: SelectOption<Value> | undefined;
  let currentIndex = -1;

  const options: SelectOption<Value>[] = [];
  const searchValues: string[] = [];
  Children.forEach(children, (child) => {
    if (!isValidElement<SelectOption<Value>>(child)) {
      return;
    }

    const { value, disabled, children } = child.props;
    if (typeof value !== "undefined") {
      if (
        value === currentValue ||
        (!currentOption && typeof currentValue === "undefined")
      ) {
        currentOption = child.props;
        currentIndex = options.length;
      }

      if (!disabled) {
        options.push(child.props);
        searchValues.push(getLabelFromChildren(children));
      }
    } else if (children) {
      const result = extractOptionsFromChildren(children, currentValue);
      if (!currentOption) {
        ({ currentOption } = result);
      }

      if (result.currentIndex !== -1) {
        currentIndex = options.length + result.currentIndex;
      }

      options.push(...result.options);
      searchValues.push(...result.searchValues);
    }
  });

  return {
    options,
    searchValues,
    currentOption,
    currentIndex,
  };
}
