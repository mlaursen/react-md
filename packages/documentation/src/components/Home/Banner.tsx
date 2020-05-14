import React, { FC, useRef, useEffect } from "react";
import { Text } from "@react-md/typography";

import { useFixedAppBarContext } from "components/Layout/fixedAppBarContext";

import Logo from "./Logo";
import styles from "./Banner.module.scss";

const Banner: FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const setElevation = useFixedAppBarContext();
  useEffect(() => {
    const banner = ref.current;
    const header = document.getElementById("layout-header");
    if (!banner || !header) {
      return;
    }

    const threshold = header.offsetHeight / banner.offsetHeight;

    const observer = new IntersectionObserver(
      ([{ isIntersecting }]) => {
        setElevation(!isIntersecting);
      },
      {
        threshold,
      }
    );
    observer.observe(banner);

    return () => {
      observer.disconnect();
    };
  }, [setElevation]);
  return (
    <div ref={ref} className={styles.banner}>
      <Text type="headline-2" className={styles.title}>
        react-md
      </Text>
      <Logo className={styles.logo} />
    </div>
  );
};

export default Banner;
