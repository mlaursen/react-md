import React, { FunctionComponent, ReactNode } from "react";
import cn from "classnames";
import toId from "utils/toId";
import Demo from "./Demo";

export interface IDemo {
  name: string;
  description: string;
  fullPage?: boolean;
  children: ReactNode;
}

export interface IDemoPageProps {
  className?: string;
  demos: IDemo[];
}

interface Result {
  ids: string[];
  children: ReactNode[];
}

const DemoPage: FunctionComponent<IDemoPageProps> = ({ demos, className }) => {
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
