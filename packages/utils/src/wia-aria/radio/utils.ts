import { CSSProperties } from "react";

import { RadioItemStyleObject, RadioItem } from "./types";

/**
 * Small util to get the value from a {@link RadioItem}.
 *
 * @param value {@link RadioItem}
 * @return the current string value of the radio item
 * @since 2.7.0
 */
export function getRadioItemValue(value: RadioItem): string {
  return typeof value === "string" ? value : value.value;
}

/**
 * This util will return the `style` object only if the `RadioItemValue` had a
 * `style` property.
 *
 * @param item {@link RadioItemStyleObject}
 * @return an optional style object to provide to the radio.
 * @since 2.7.0
 */
export const defaultGetRadioStyle = (
  item: RadioItemStyleObject
): CSSProperties | undefined => item.style;

/**
 * This util will return the `className` string only if the `RadioItemValue`
 * had a `className` property.
 *
 * @param item {@link RadioItemStyleObject}
 * @return an optional className to provide to the radio
 * @since 2.7.0
 */
export const defaultGetRadioClassName = (
  item: RadioItemStyleObject
): string | undefined => item.className;
