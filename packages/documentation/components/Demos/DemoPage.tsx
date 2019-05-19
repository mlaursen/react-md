import React, { FunctionComponent } from "react";
import cn from "classnames";

import useCrossFade from "hooks/useCrossFade";
import { toId } from "utils/toTitle";

import Demo, { DemoProps } from "./Demo";

export interface DemoPageProps {
  className?: string;
  packageName: string;
  demos: Pick<
    DemoProps,
    | "name"
    | "description"
    | "fullPage"
    | "disableFullPageAppBar"
    | "disableFullPageContent"
    | "phoneFullPage"
    | "mobileFullPage"
    | "fileName"
    | "children"
  >[];
}

const DemoPage: FunctionComponent<DemoPageProps> = ({
  demos,
  packageName,
  className: propClassName,
}) => {
  const className = useCrossFade(propClassName);
  return (
    <div id="demo-page-container" className={cn("demo-page", className)}>
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

export default DemoPage;
