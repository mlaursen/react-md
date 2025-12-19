import { Divider } from "@react-md/core/divider/Divider";
import { type ReactElement } from "react";

import { ComponentsAndHooks } from "./ComponentsAndHooks.js";
import { HomePageBanner } from "./HomePageBanner.js";
import { Styling } from "./Styling.js";
import styles from "./page.module.scss";

export default function HomePage(): ReactElement {
  return (
    <>
      <HomePageBanner />
      <Styling />
      <Divider className={styles.divider} />
      <ComponentsAndHooks />
    </>
  );
}
