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
  propStyle?: CSSProperties;
  defaultValue: string;
  rows: number;
  maxRows: number;
  disabled?: boolean;
  ref?: Ref<HTMLTextAreaElement>;
}

const toFloat = (x: string | null) => parseFloat(x || "");

export default function useTextAreaHeightAnimation({
  ref,
  rows,
  maxRows,
  propStyle,
  defaultValue,
  disabled,
}: Options) {
  const maskRef = useRef<HTMLTextAreaElement | null>(null);
  const [containerStyle, setStyle] = useState(propStyle);
  const cache = useRefCache({
    propStyle,
    rows,
    maxRows,
    disabled,
    containerStyle,
  });
  const update = useCallback((value: string) => {
    const {
      rows,
      maxRows,
      propStyle,
      containerStyle,
      disabled,
    } = cache.current;
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
    if (!containerStyle || containerStyle.height !== height) {
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
    containerStyle: disabled ? propStyle : containerStyle,
    maskRef,
    areaRef: disabled ? ref : refCB,
    update,
  };
}
