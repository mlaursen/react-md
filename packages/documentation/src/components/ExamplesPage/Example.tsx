import * as React from "react";
import cn from "classnames";
import { Text } from "@react-md/typography";

import Markdown from "components/Markdown";

export interface IExampleProps {
  title: string;
  children?: React.ReactNode;
  className?: string;
  description?: string;
  contentClassName?: string;
}

const Example: React.SFC<IExampleProps> = ({ title, children, className, contentClassName, description }) => (
  <section className={cn("examples-page__example", className)}>
    <Text type="headline-4" className="examples-page__example-title">{title}</Text>
    {description && <Markdown markdown={description} />}
    <div className={cn("examples-page__example-content example-group", contentClassName)}>
      {children}
    </div>
  </section>
);

export default Example;
