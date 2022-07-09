import { cnb } from "cnbuilder";
import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import { bem } from "../bem";
import { randomInt } from "../randomInt";
import { useSsr } from "../SsrProvider";

const styles = bem("rmd-skeleton-placeholder");

export interface SkeletonPlaceholderOptions {
  style?: CSSProperties;
  className?: string;

  minPercentage?: number;
  maxPercentage?: number;

  /** @defaultValue `1em` */
  height?: string | number;

  /** @defaultValue `randomInt({ min: 30, max: 80})%` */
  width?: number | string;

  /** @defaultValue `true` */
  active?: boolean;

  /** @defaultValue `true` */
  animate?: boolean;
}

export interface SkeletonPlaceholderStylingProps {
  style?: CSSProperties;
  className: string;
}

export function useSkeletonPlaceholder(
  options: SkeletonPlaceholderOptions = {}
): SkeletonPlaceholderStylingProps {
  const {
    style: propStyle,
    className,
    height,
    width: propWidth,
    active = true,
    animate = true,
    minPercentage = 40,
    maxPercentage = 85,
  } = options;
  const ssr = useSsr();

  const [randomPercentage, setRandomPercentage] = useState<string | undefined>(
    () => {
      if (typeof window === "undefined" || ssr) {
        return;
      }

      return `${randomInt({ min: minPercentage, max: maxPercentage })}%`;
    }
  );

  useEffect(() => {
    if (!ssr || !active || typeof propWidth === "undefined") {
      return;
    }

    setRandomPercentage(
      `${randomInt({ min: minPercentage, max: maxPercentage })}%`
    );
  }, [active, maxPercentage, minPercentage, propWidth, ssr]);

  const width = useMemo(() => {
    if (!active || typeof propWidth !== "undefined") {
      return propWidth;
    }

    if (ssr) {
      return randomPercentage;
    }

    return `${randomInt({ min: minPercentage, max: maxPercentage })}%`;
  }, [active, maxPercentage, minPercentage, propWidth, randomPercentage, ssr]);

  let style: CSSProperties | undefined = propStyle;
  if (typeof width !== "undefined" || typeof height !== "undefined") {
    style = {
      ...style,
      height: height ?? style?.height,
      width: width ?? style?.width,
    };
  }

  return {
    style,
    className: cnb(className, active && styles({ animate })),
  };
}
