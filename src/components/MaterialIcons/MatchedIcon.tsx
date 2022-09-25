import {
  box,
  RippleContainer,
  SkeletonPlaceholder,
  typography,
  useElementInteraction,
} from "@react-md/core";
import { cnb } from "cnbuilder";
import type { MouseEventHandler, ReactElement } from "react";
import styles from "./MatchedIcon.module.scss";
import type { IconReference } from "./useMaterialIcons";

export interface MatchedIconProps extends IconReference {
  onClick: MouseEventHandler<HTMLButtonElement>;
  loading: boolean;
}

export function MatchedIcon(props: MatchedIconProps): ReactElement {
  const { icon: Icon, name, onClick, loading } = props;

  const { pressedClassName, handlers, rippleContainerProps } =
    useElementInteraction({ onClick });

  return (
    <button
      {...handlers}
      type="button"
      className={box({
        className: cnb(
          styles.button,
          pressedClassName,
          typography({ type: "body-1" })
        ),
        stacked: true,
        justify: "center",
      })}
    >
      <SkeletonPlaceholder
        disabled={!loading}
        className={styles.iconLoader}
        width={null}
      >
        <Icon />
      </SkeletonPlaceholder>
      <SkeletonPlaceholder
        disabled={!loading}
        className={styles.name}
        width={loading ? undefined : null}
      >
        {name}
      </SkeletonPlaceholder>
      {rippleContainerProps && <RippleContainer {...rippleContainerProps} />}
    </button>
  );
}
