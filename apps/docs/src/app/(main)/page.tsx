import { Divider } from "@react-md/core/divider/Divider";
import { type ReactElement } from "react";

import { ComponentsAndHooks } from "./ComponentsAndHooks.jsx";
import { HomePageBanner } from "./HomePageBanner.jsx";
import { Styling } from "./Styling.jsx";
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
