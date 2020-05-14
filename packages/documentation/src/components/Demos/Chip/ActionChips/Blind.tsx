import React, { FC } from "react";
import cn from "classnames";
import CSSTransition, {
  CSSTransitionClassNames,
} from "react-transition-group/CSSTransition";

import styles from "./Blind.module.scss";

export interface BlindProps {
  visible: boolean;
  onExited?(): void;
}

const CLASSNAMES: CSSTransitionClassNames = {
  enter: styles.enter,
  enterActive: cn(styles.entering, styles.animate),
  enterDone: styles.done,
  exit: styles.exit,
  exitActive: cn(styles.exiting, styles.animate),
};

const Blind: FC<BlindProps> = ({ visible, onExited }) => (
  <CSSTransition
    timeout={2500}
    classNames={CLASSNAMES}
    in={visible}
    onExited={onExited}
  >
    <span className={styles.blind} />
  </CSSTransition>
);

export default Blind;
