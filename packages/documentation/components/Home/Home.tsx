import React, { FunctionComponent } from "react";
import { Text } from "@react-md/typography";

import "./home.scss";
import Goals from "./Goals";
import { Component as Logo } from "./logo.svg";

const Home: FunctionComponent = () => (
  <div className="home">
    <div className="home__banner">
      <Text type="headline-2" className="home__title">
        react-md
      </Text>
      <Logo className="home__logo" />
    </div>
    <Goals />
  </div>
);

export default Home;
