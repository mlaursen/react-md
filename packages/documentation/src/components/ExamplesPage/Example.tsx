import * as React from "react";
import { Text } from "@react-md/typography";
import cn from "classnames";

export interface IExampleProps {
  title: string;
  children?: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

const Example: React.SFC<IExampleProps> = ({ title, children, className, contentClassName }) => (
  <section className={cn("examples-page__example", className)}>
    <Text type="headline-4" className="examples-page__example-title">{title}</Text>
    <div className={cn("examples-page__example-content example-group", contentClassName)}>
      {children}
    </div>
  </section>
);

export default Example;
