import {
  box,
  RippleContainer,
  SkeletonPlaceholder,
  typography,
  useElementInteraction,
  useToggle,
} from "@react-md/core";
import { Dialog } from "@react-md/dialog";
import { cnb } from "cnbuilder";
import type { ReactElement } from "react";
import { useId } from "react";
import styles from "./MatchedIcon.module.scss";
import { MatchedIconContent } from "./MatchedIconContent";
import type { IconReference } from "./useMaterialIcons";

export interface MatchedIconProps extends IconReference {
  loading: boolean;
}

export function MatchedIcon(props: MatchedIconProps): ReactElement {
  const { icon: Icon, name, loading } = props;
  const { toggle, toggled: visible, disable: onRequestClose } = useToggle();

  const { pressedClassName, handlers, rippleContainerProps } =
    useElementInteraction({
      onClick: toggle,
    });

  const titleId = useId();

  return (
    <>
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
      <Dialog
        aria-labelledby={titleId}
        visible={visible}
        onRequestClose={onRequestClose}
        className={styles.dialog}
      >
        <MatchedIconContent
          {...props}
          titleId={titleId}
          onRequestClose={onRequestClose}
        />
      </Dialog>
    </>
  );
}
