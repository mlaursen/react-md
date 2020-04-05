import React, { FC, useState } from "react";
import { CSSTransition } from "react-transition-group";

import styles from "./styles";

interface BlindsProps {
  visible: boolean;
}

const prefix = (type: string): string => `action-chips__${type}`;
const blinds = prefix("blinds");
const BLINDS = {
  enter: `${blinds}--enter`,
  enterActive: `${blinds}--enter-active ${blinds}--animate`,
  exit: `${blinds}--exit`,
  exitActive: `${blinds}--exit-active ${blinds}--animate`,
};

const blind = prefix("blind");
const BLIND = {
  enter: `${blind}--enter`,
  enterActive: `${blind}--enter-active ${blind}--animate`,
  enterDone: `${blind}--done`,
  exit: `${blind}--exit`,
  exitActive: `${blind}--exit-active ${blind}--animate`,
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
      classNames={BLINDS}
    >
      {(state) => (
        <div className={styles("blinds")}>
          {Array.from(new Array(11), (_, i) => (
            <CSSTransition
              key={i}
              timeout={2500}
              classNames={BLIND}
              in={visible && state === "entered"}
              onExited={i === 10 ? hide : undefined}
            >
              <span className={styles("blind")} />
            </CSSTransition>
          ))}
        </div>
      )}
    </CSSTransition>
  );
};

export default Blinds;
