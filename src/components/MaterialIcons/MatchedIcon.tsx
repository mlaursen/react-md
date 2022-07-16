import {
  box,
  typography,
  RippleContainer,
  SkeletonPlaceholder,
  useElementInteraction,
} from "@react-md/core";
import { cnb } from "cnbuilder";
import type { ReactElement } from "react";
import { useId, useState } from "react";
import type { IconReference } from "./useMaterialIcons";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@react-md/dialog";
import styles from "./MatchedIcon.module.scss";

export interface MatchedIconProps extends IconReference {
  loading: boolean;
}

export function MatchedIcon(props: MatchedIconProps): ReactElement {
  const { icon: Icon, name, loading } = props;
  const [visible, setVisible] = useState(false);

  const { pressedClassName, handlers, rippleContainerProps } =
    useElementInteraction({
      onClick() {
        setVisible((p) => !p);
      },
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
          flexDirection: "column",
          justifyContent: "center",
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
        onRequestClose={() => setVisible(false)}
      >
        <DialogHeader>
          <DialogTitle id={titleId}>{name}</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <div className={styles.preview}>
            <Icon />
          </div>
          <Icon dense />
          <Icon color="primary" />
          <Icon color="secondary" />
          <Icon color="warning" />
          <Icon color="success" />
          <Icon color="error" />
          <Icon color="hint" />
          <Icon color="disabled" />
        </DialogContent>
      </Dialog>
    </>
  );
}
