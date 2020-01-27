import React, { FC } from "react";

import PageMeta from "components/PageMeta";

import "./Home.scss";
import Banner from "./Banner";
import Goals from "./Goals";
import JumpStart from "./JumpStart";
import LibraryInfo from "./LibraryInfo";

const Home: FC = () => (
  <div className="home">
    <PageMeta />
    <Banner />
    <Goals />
    <JumpStart />
    <LibraryInfo />
  </div>
);

export default Home;
