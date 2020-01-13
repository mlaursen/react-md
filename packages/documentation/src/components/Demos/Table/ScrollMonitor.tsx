import React, { FC, Ref, useEffect, MutableRefObject } from "react";

interface Props {
  scrollEl: HTMLElement | null;
}

const ScrollMonitor: FC<Props> = ({ scrollEl }) => {
  useEffect(() => {
    const target = scrollEl;
    // const { current } = scrollEl;
    // if (!current) {
    //   return;
    // }

    // const target = document.querySelector<HTMLTableRowElement>("tbody tr");
    // console.log("target:", target);
    if (!target) {
      return;
    }
    const root = document.documentElement;
    const callback: IntersectionObserverCallback = entries => {
      entries.forEach(entry => {
        console.log("entry:", entry);
      });
    };

    const observer = new IntersectionObserver(callback, {
      root,
    });
    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [scrollEl]);
  return null;
};

export default ScrollMonitor;
