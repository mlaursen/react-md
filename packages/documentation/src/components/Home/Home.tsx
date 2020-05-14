import React, { FC } from "react";

import PageMeta from "components/PageMeta";

import Banner from "./Banner";
import Goals from "./Goals";
import JumpStart from "./JumpStart";
import LibraryInfo from "./LibraryInfo";

const Home: FC = () => (
  <>
    <PageMeta />
    <Banner />
    <Goals />
    <JumpStart />
    <LibraryInfo />
  </>
);

export default Home;
