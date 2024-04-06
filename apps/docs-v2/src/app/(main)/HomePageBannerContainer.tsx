"use client";
import { cssUtils } from "@react-md/core/cssUtils";
import { useIntersectionObserver } from "@react-md/core/useIntersectionObserver";
import { cnb } from "cnbuilder";
import {
  useCallback,
  useEffect,
  useRef,
  type ReactElement,
  type ReactNode,
} from "react";
import styles from "./HomePageBannerContainer.module.scss";

const ELEVATED_CLASS_NAME = "rmd-app-bar--elevated";

export interface HomePageBannerContainerProps {
  children: ReactNode;
}

export function HomePageBannerContainer(
  props: HomePageBannerContainerProps
): ReactElement {
  const { children } = props;

  const header = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const appBar = document.querySelector<HTMLElement>(`.rmd-app-bar--fixed`);
    if (!appBar) {
      return;
    }
    header.current = appBar;

    return () => {
      appBar.classList.add(ELEVATED_CLASS_NAME);
    };
  }, []);

  const nodeRef = useIntersectionObserver({
    onUpdate: useCallback(([entry]) => {
      if (!entry) {
        return;
      }

      const appBar = header.current;
      if (!appBar) {
        return;
      }

      if (entry.isIntersecting) {
        appBar.classList.remove(ELEVATED_CLASS_NAME);
      } else {
        appBar.classList.add(ELEVATED_CLASS_NAME);
      }
    }, []),
    rootMargin: "-48px 0px",
  });

  return (
    <div
      ref={nodeRef}
      className={cnb(styles.container, cssUtils({ textAlign: "center" }))}
    >
      {children}
    </div>
  );
}
