import React, { FC } from "react";
import cn from "classnames";

import useCrossFade from "hooks/useCrossFade";
import { toId } from "utils/toTitle";

import Demo, { DemoProps } from "./Demo";
import DemoPageHeader from "./DemoPageHeader";
import DemoPageFont from "./DemoPageFont";

export interface DemoPageProps {
  className?: string;
  packageName: string;
  description?: string;
  demos: Pick<
    DemoProps,
    | "name"
    | "description"
    | "fullPage"
    | "fullPageFAB"
    | "disableFullPageAppBar"
    | "disableFullPageContent"
    | "phoneFullPage"
    | "mobileFullPage"
    | "fileName"
    | "children"
  >[];
  fonts?: string[];
}

type DefaultProps = Required<Pick<DemoPageProps, "fonts">>;
type WithDefaultProps = DemoPageProps & DefaultProps;

const DemoPage: FC<DemoPageProps> = props => {
  const {
    demos,
    description,
    packageName,
    className: propClassName,
    fonts,
  } = props as WithDefaultProps;
  const className = useCrossFade(propClassName);
  return (
    <div id="demo-page-container" className={cn("demo-page", className)}>
      {fonts.map(font => (
        <DemoPageFont font={font} key={font} />
      ))}
      <DemoPageHeader packageName={packageName}>{description}</DemoPageHeader>
      {demos.map(({ name, ...props }, index) => {
        const id = toId(name);
        return (
          <Demo
            {...props}
            key={id}
            id={id}
            name={name}
            index={index}
            packageName={packageName}
          />
        );
      })}
    </div>
  );
};

DemoPage.defaultProps = {
  fonts: [],
};

export default DemoPage;
