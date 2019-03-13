import React, { FunctionComponent, ReactNode, Fragment } from "react";
import cn from "classnames";
import { toId } from "utils/toTitle";
import Demo, { DemoProps } from "./Demo";
import TableOfContents from "components/TableOfContents";
import { Heading } from "components/TableOfContents/TableOfContents";

export interface DemoPageProps {
  className?: string;
  packageName: string;
  demos: Pick<
    DemoProps,
    "name" | "description" | "fullPage" | "fileName" | "children"
  >[];
}

interface Result {
  headings: Heading[];
  children: ReactNode[];
}

const DemoPage: FunctionComponent<DemoPageProps> = ({
  demos,
  packageName,
  className,
}) => {
  const { headings, children } = demos.reduce<Result>(
    (result, demo, index) => {
      const { name, description, fullPage, children } = demo;
      const id = toId(name);
      result.headings.push({
        id,
        title: name,
      });
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
    { headings: [], children: [] }
  );
  return (
    <Fragment>
      <TableOfContents headings={headings} />
      <div id="demo-page-container" className={cn("demo-page", className)}>
        {children}
      </div>
    </Fragment>
  );
};

export default DemoPage;
