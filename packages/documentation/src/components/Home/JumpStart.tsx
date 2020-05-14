import React, { FC } from "react";

import GettingStarted from "./GettingStarted";
import Components from "./Components";
import Customization from "./Customization";

import styles from "./JumpStart.module.scss";

const JumpStart: FC = () => (
  <div className={styles.container}>
    <GettingStarted />
    <Components />
    <Customization />
  </div>
);

export default JumpStart;
