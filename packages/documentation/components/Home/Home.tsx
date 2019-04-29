import React, { FunctionComponent } from "react";

import "./home.scss";
import Banner from "./Banner";
import Goals from "./Goals";
import JumpStart from "./JumpStart";
import LibraryWarning from "./LibraryWarning";

const Home: FunctionComponent = () => (
  <div className="home">
    <Banner />
    <Goals />
    <JumpStart />
    <LibraryWarning />
  </div>
);

export default Home;
