import React, { FC, useState } from "react";
import cn from "classnames";
import CSSTransition, {
  CSSTransitionClassNames,
} from "react-transition-group/CSSTransition";

import Blind from "./Blind";
import styles from "./Blinds.module.scss";

interface BlindsProps {
  visible: boolean;
}

const CLASSNAMES: CSSTransitionClassNames = {
  enter: styles.enter,
  enterActive: cn(styles.entering, styles.animate),
  exit: styles.exit,
  exitActive: cn(styles.exiting, styles.animate),
};

const Blinds: FC<BlindsProps> = ({ visible }) => {
  const [exited, setExited] = useState(true);
  if (visible && exited) {
    setExited(false);
  }

  const hide = (): void => setExited(true);

  const isVisible = visible || !exited;

  return (
    <CSSTransition
      in={isVisible}
      mountOnEnter
      unmountOnExit
      timeout={1500}
      classNames={CLASSNAMES}
    >
      {(state) => (
        <div className={styles.blinds}>
          {Array.from(new Array(11), (_, i) => (
            <Blind
              key={i}
              visible={visible && state === "entered"}
              onExited={i === 10 ? hide : undefined}
            />
          ))}
        </div>
      )}
    </CSSTransition>
  );
};

export default Blinds;
