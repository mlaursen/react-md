import React, { FC } from "react";
import GettingStarted from "./GettingStarted";
import Components from "./Components";
import Customization from "./Customization";

const JumpStart: FC = () => (
  <div className="home__jump-start">
    <GettingStarted />
    <Components />
    <Customization />
  </div>
);

export default JumpStart;
