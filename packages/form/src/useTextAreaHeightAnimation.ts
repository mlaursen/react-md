import {
  useState,
  useRef,
  CSSProperties,
  useCallback,
  useEffect,
  Ref,
} from "react";
import { useRefCache, applyRef } from "@react-md/utils";

interface Options {
  style?: CSSProperties;
  defaultValue: string;
  rows: number;
  maxRows: number;
  disabled?: boolean;
  ref?: Ref<HTMLTextAreaElement>;
}

const toFloat = (x: string | null) => parseFloat(x || "");

/**
 *
 * @private
 */
export default function useTextAreaHeightAnimation({
  ref,
  rows,
  maxRows,
  style: propStyle,
  defaultValue,
  disabled,
}: Options) {
  const maskRef = useRef<HTMLTextAreaElement | null>(null);
  const [style, setStyle] = useState(propStyle);
  const cache = useRefCache({
    propStyle,
    rows,
    maxRows,
    disabled,
    style,
  });
  const update = useCallback((value: string) => {
    const { rows, maxRows, propStyle, style, disabled } = cache.current;
    const mask = maskRef.current;
    const container = mask && (mask.parentElement as HTMLDivElement | null);
    if (!mask || !container || disabled) {
      return;
    }

    const { borderTopWidth, borderBottomWidth } = window.getComputedStyle(
      container
    );
    const maskStyle = window.getComputedStyle(mask);
    const lineHeight = toFloat(maskStyle.lineHeight);

    const containerOffset =
      toFloat(borderTopWidth) +
      toFloat(borderBottomWidth) +
      toFloat(maskStyle.marginTop);

    mask.value = value;
    let height = mask.scrollHeight + containerOffset;
    if (maxRows > 0) {
      height = Math.min(height, lineHeight * maxRows + containerOffset);
    }

    height = Math.max(height, lineHeight * rows);
    if (!style || style.height !== height) {
      setStyle({ height, ...propStyle });
    }
  }, []);

  const refCB = useCallback(
    (instance: HTMLTextAreaElement | null) => {
      applyRef(instance, ref);

      if (instance) {
        update(instance.value);
      }
    },
    [ref]
  );

  return {
    style: disabled ? style : style,
    maskRef,
    areaRef: disabled ? ref : refCB,
    update,
  };
}
