import React, { FC, useRef, useEffect } from "react";
import { Text } from "@react-md/typography";
import { useFixedAppBarContext } from "components/Layout/fixedAppBarContext";
import Logo from "./Logo";

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
    <div ref={ref} className="home__banner">
      <Text type="headline-2" className="home__title">
        react-md
      </Text>
      <Logo className="home__logo" />
    </div>
  );
};

export default Banner;
