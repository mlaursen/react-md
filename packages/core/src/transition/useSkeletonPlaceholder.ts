import type { CSSProperties } from "react";
import { useMemo } from "react";
import { cnb } from "cnbuilder";
import { randomInt } from "../randomInt";
import { bem } from "../bem";

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

  const width = useMemo(() => {
    if (!active || typeof propWidth !== "undefined") {
      return propWidth;
    }

    return `${randomInt({ min: minPercentage, max: maxPercentage })}%`;
  }, [active, maxPercentage, minPercentage, propWidth]);

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
