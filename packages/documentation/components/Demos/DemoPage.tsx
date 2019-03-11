import React, { FunctionComponent, ReactNode } from "react";
import cn from "classnames";
import { toId } from "utils/toTitle";
import Demo, { DemoProps } from "./Demo";

export interface DemoPageProps {
  className?: string;
  packageName: string;
  demos: Pick<
    DemoProps,
    "name" | "description" | "fullPage" | "fileName" | "children"
  >[];
}

interface Result {
  ids: string[];
  children: ReactNode[];
}

const DemoPage: FunctionComponent<DemoPageProps> = ({
  demos,
  packageName,
  className,
}) => {
  const { ids, children } = demos.reduce<Result>(
    (result, demo, index) => {
      const { name, description, fullPage, children } = demo;
      const id = toId(name);
      result.ids.push(id);
      result.children.push(
        <Demo
          key={id}
          id={id}
          name={name}
          description={description}
          fullPage={fullPage}
          index={index}
          packageName={packageName}
        >
          {children}
        </Demo>
      );

      return result;
    },
    { ids: [], children: [] }
  );
  return (
    <div id="demo-page-container" className={cn("demo-page", className)}>
      {children}
    </div>
  );
};

export default DemoPage;
