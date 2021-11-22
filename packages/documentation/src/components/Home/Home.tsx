import { ReactElement } from "react";

import PageMeta from "components/PageMeta";

import Banner from "./Banner";
import Goals from "./Goals";
import JumpStart from "./JumpStart";
import LibraryInfo from "./LibraryInfo";

export default function Home(): ReactElement {
  return (
    <>
      <PageMeta />
      <Banner />
      <Goals />
      <JumpStart />
      <LibraryInfo />
    </>
  );
}
