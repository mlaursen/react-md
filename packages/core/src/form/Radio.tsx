"use client";

import { type ReactElement } from "react";

import { InputToggle, type RadioProps } from "./InputToggle.js";

/**
 * **Client Component**
 *
 * You'll generally want to use the `useRadioGroup` hook along with this
 * component.
 *
 * @example Simple Example
 * ```tsx
 * const { value, getRadioProps } = useRadioGroup({ name: "group" });
 *
 * return (
 *   <>
 *     <Radio {...getRadioProps("a")} label="First" />
 *     <Radio {...getRadioProps("b")} label="Second" />
 *     <Radio {...getRadioProps("c")} label="Third" />
 *   </>
 * );
 * ```
 *
 * @see {@link https://react-md.dev/components/radio | Radio Demos}
 */
export function Radio(props: RadioProps): ReactElement {
  const { ref, ...remaininig } = props;

  return <InputToggle {...remaininig} ref={ref} type="radio" />;
}
