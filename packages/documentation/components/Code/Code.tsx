import React, { FunctionComponent, ReactNode, Fragment } from "react";
import cn from "classnames";
import Head from "next/head";

export interface ICodeProps {
  className?: string;
  children: ReactNode;
  inline?: boolean;
}

const Code: FunctionComponent<ICodeProps> = ({
  children,
  inline,
  className,
}) => (
  <Fragment>
    <Head>
      <link
        key="source-code-pro"
        href="https://fonts.googleapis.com/css?family=Source+Code+Pro"
        rel="stylesheet"
      />
    </Head>
    <code className={cn("code", { "code--inline": inline }, className)}>
      {children}
    </code>
  </Fragment>
);

Code.defaultProps = {
  inline: true,
};

export default Code;
