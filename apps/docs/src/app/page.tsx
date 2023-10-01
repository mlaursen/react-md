import { Divider } from "@react-md/core";
import { type ReactElement } from "react";
import { Banner } from "./Banner.jsx";
import { ComponentsAndHooks } from "./ComponentsAndHooks.jsx";
import { Styling } from "./Styling.jsx";
import styles from "./page.module.scss";

export default async function HomePage(): Promise<ReactElement> {
  return (
    <>
      <Banner />
      <Styling />
      <Divider className={styles.divider} />
      <ComponentsAndHooks />
    </>
  );
}
