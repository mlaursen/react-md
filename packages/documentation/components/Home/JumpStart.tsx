import React, { FunctionComponent } from "react";
import GettingStarted from "./GettingStarted";
import Components from "./Components";
import Customization from "./Customization";

const JumpStart: FunctionComponent = () => (
  <div className="home__jump-start">
    <GettingStarted />
    <Components />
    <Customization />
  </div>
);

export default JumpStart;
