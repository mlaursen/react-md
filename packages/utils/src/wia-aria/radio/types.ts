import { HTMLAttributes } from "react";

/**
 * Since the `RadioWidget` modifies the props a bit for the radio widget, these
 * are the `HTMLAttributes` for the `RadioWidget` that can be overwritten.
 *
 * @remarks \@since 2.7.0
 */
export type RadioWidgetAttributes = Omit<
  HTMLAttributes<HTMLSpanElement>,
  "id" | "aria-checked" | "onChange" | "tabIndex"
>;

/**
 * @remarks \@since 2.7.0
 */
export interface RadioItemValueObject extends RadioWidgetAttributes {
  /**
   * The current value for the radio item. When this object does not contain a
   * `children` property, this will be rendered as the `children` instead.
   */
  value: string;
}

/**
 * The radio item value can be a simple string or an object containing a `value`
 * attribute.
 *
 * @remarks \@since 2.7.0
 */
export type RadioItem = string | RadioItemValueObject;

/**
 * @remarks \@since 2.7.0
 */
export interface RadioItemStyleObject extends RadioItemValueObject {
  /**
   * The current index of the radio item. This starts from `0`.
   */
  index: number;

  /**
   * Boolean if the current radio item is checked.
   */
  checked: boolean;
}
