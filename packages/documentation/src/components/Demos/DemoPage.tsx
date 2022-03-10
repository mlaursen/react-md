import type { ReactElement } from "react";
import { useEffect } from "react";
import cn from "classnames";
import { defaults } from "lodash";

import { toId } from "utils/toTitle";

import Demo from "./Demo";
import DemoPageHeader from "./DemoPageHeader";
import type { DemoPageConfig, DemoProps, DemoConfig } from "./types";

import styles from "./DemoPage.module.scss";

export interface DemoPageProps extends DemoPageConfig {
  className?: string;
  packageName: string;
}

const getDemoProps = (
  props: DemoPageProps,
  demo: DemoConfig,
  index: number
): DemoProps & { key: string } => {
  const { name } = demo;
  const { packageName } = props;
  const id = toId(name);
  const config = defaults({}, demo, props);
  return {
    ...demo,
    ...config,
    key: id,
    id,
    index,
    packageName,
  };
};

const EMPTY_LIST: string[] = [];

export default function DemoPage(props: DemoPageProps): ReactElement {
  const {
    demos,
    description,
    packageName,
    className,
    fonts = EMPTY_LIST,
  } = props;
  useEffect(() => {
    const head = document.querySelector("head");
    if (!head || !fonts.length) {
      return;
    }

    const links: HTMLLinkElement[] = [];
    fonts.forEach((font) => {
      let href: string;
      if (font === "Font Awesome") {
        href =
          "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css";
      } else {
        const name = font.replace(/\s+/g, "+");
        href = `https://fonts.googleapis.com/css2?family=${name}&display=swap`;
      }
      const link = document.createElement("link");

      link.rel = "stylesheet";
      link.href = href;

      head.appendChild(link);
      links.push(link);
    });

    return () => {
      links.forEach((link) => {
        head.removeChild(link);
      });
    };
  }, [fonts]);

  return (
    <div id="demo-page-container" className={cn(styles.container, className)}>
      <DemoPageHeader packageName={packageName}>{description}</DemoPageHeader>
      {demos.map((demo, index) => (
        // eslint-disable-next-line react/jsx-key
        <Demo {...getDemoProps(props, demo, index)} />
      ))}
    </div>
  );
}
