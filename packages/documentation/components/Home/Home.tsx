import React, { FC } from "react";

import PageMeta from "components/PageMeta";

import "./home.scss";
import Banner from "./Banner";
import Goals from "./Goals";
import JumpStart from "./JumpStart";
import LibraryWarning from "./LibraryWarning";

const Home: FC = () => (
  <div className="home">
    <PageMeta />
    <Banner />
    <Goals />
    <JumpStart />
    <LibraryWarning />
  </div>
);

export default Home;
