import type { CSSProperties, Ref, RefCallback } from "react";
import { useCallback, useState } from "react";
import { applyRef } from "@react-md/utils";

/** @remarks \@since 5.0.0 */
export interface VerticalDividerHookOptions<E extends HTMLElement> {
  /**
   * An optional ref to merge with the returned ref.
   */
  ref?: Ref<E>;

  /**
   * An optional style object to merge with the divider's height style.
   */
  style?: CSSProperties;

  /**
   * The max height for the vertical divider. When this is `<= 0`, the hook will
   * be disabled.
   *
   * When the value is between 0 and 1, it will be used as a multiplier with the
   * parent element's height. When the value is greater than 1, it will be used
   * in `Math.min(parentElementHeight, maxHeight)`.
   */
  maxHeight: number;
}

/** @remarks \@since 5.0.0 */
export interface VerticalDividerHeight<E extends HTMLElement> {
  ref: RefCallback<E>;
  style: CSSProperties | undefined;
}

/**
 * This is a small hook that is used to automatically create a vertical divider
 * based on the computed height of its parent element.
 *
 * @param maxHeight - The max height for the vertical divider. When the value is
 * between 0 and 1, it will be used as a percentage. Otherwise the smaller value
 * of parent element height and this will be used.
 * @remarks \@since 5.0.0 The hook accepts an object instead of using multiple
 * params and uses a generic for the HTMLElement type.
 */
export function useVerticalDividerHeight<E extends HTMLElement>({
  ref,
  style,
  maxHeight,
}: VerticalDividerHookOptions<E>): VerticalDividerHeight<E> {
  const [height, setHeight] = useState<number | undefined>(undefined);
  const refCallback = useCallback(
    (instance: E | null) => {
      applyRef(instance, ref);
      if (!instance || !instance.parentElement || maxHeight === 0) {
        return;
      }

      const height = instance.parentElement.offsetHeight;
      if (maxHeight <= 1) {
        setHeight(height * maxHeight);
      } else {
        setHeight(Math.min(height, maxHeight));
      }
    },
    [maxHeight, ref]
  );

  return {
    ref: refCallback,
    style: maxHeight <= 0 ? style : { ...style, height },
  };
}
