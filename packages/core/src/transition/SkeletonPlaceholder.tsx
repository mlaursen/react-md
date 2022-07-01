import type { HTMLAttributes, ReactElement, ReactNode } from "react";
import { useSkeletonPlaceholder } from "./useSkeletonPlaceholder";

export interface SkeletonPlaceholderProps
  extends HTMLAttributes<HTMLDivElement> {
  height?: string | number;
  width?: number | string;
  disabled?: boolean;
  disableAnimation?: boolean;
  minPercentage?: number;
  maxPercentage?: number;
  children?: ReactNode;
}

export function SkeletonPlaceholder(
  props: SkeletonPlaceholderProps
): ReactElement {
  const {
    style,
    className,
    height,
    width,
    children,
    disabled = !!children,
    disableAnimation = false,
    minPercentage,
    maxPercentage,
    ...remaining
  } = props;
  const skeleton = useSkeletonPlaceholder({
    active: !disabled,
    animate: !disableAnimation,
    style,
    className,
    height,
    width,
    minPercentage,
    maxPercentage,
  });

  return (
    <div {...remaining} {...skeleton}>
      {children}
    </div>
  );
}
