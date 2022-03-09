import type { ReactElement } from "react";

import GettingStarted from "./GettingStarted";
import Components from "./Components";
import Customization from "./Customization";

import styles from "./JumpStart.module.scss";

export default function JumpStart(): ReactElement {
  return (
    <div className={styles.container}>
      <GettingStarted />
      <Components />
      <Customization />
    </div>
  );
}
