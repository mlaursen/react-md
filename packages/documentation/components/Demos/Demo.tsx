import React, { FunctionComponent, ReactNode } from "react";
import cn from "classnames";
import { AppBar } from "@react-md/app-bar";
import { CodeSVGIcon } from "@react-md/material-icons";

import { GITHUB_DEMO_URL } from "constants/index";
import AppBarAction from "components/AppBarAction";
import Heading from "components/Heading";
import { Markdown } from "components/Markdown";
import GithubLink from "components/GithubLink";
import { toTitle } from "utils/toTitle";

import "./demo.scss";
import FullPageDemo from "./FullPageDemo";

export interface DemoProps {
  id: string;
  name: string;
  description: string;
  fullPage?: boolean;
  index: number;
  fileName?: string;
  packageName: string;

  /**
   * This should be the demo content to display.
   */
  children: ReactNode;
}

type WithDefaultProps = DemoProps & Required<Pick<DemoProps, "fullPage">>;

const Demo: FunctionComponent<DemoProps> = props => {
  const {
    id,
    name,
    description,
    fullPage,
    children,
    index,
    packageName,
  } = props as WithDefaultProps;
  let { fileName } = props;
  if (!fileName) {
    const title = toTitle(packageName, "");
    fileName = `${GITHUB_DEMO_URL}/${title}/${name.replace(/ /g, "")}`;
  }

  if (!fileName.endsWith(".tsx")) {
    fileName = `${fileName}.tsx`;
  }

  return (
    <section id={id} className={cn("demo", { "demo--spaced": index > 0 })}>
      <Heading level={2} id={`${id}-title`} noMarginTop={index > 0}>
        {name}
      </Heading>
      <Markdown id={`${id}-description`} className="demo__description">
        {description}
      </Markdown>
      <AppBar id={`${id}-preview-toolbar`} theme="clear">
        <AppBarAction
          id={`${id}-show-code`}
          first
          tooltip="Show the code for this example"
        >
          <CodeSVGIcon />
        </AppBarAction>
        <GithubLink id={`${id}-github`} href={fileName} />
      </AppBar>
      <div id={`${id}-preview`} className="demo__preview">
        {fullPage ? (
          <FullPageDemo id={`${id}-preview`}>{children}</FullPageDemo>
        ) : (
          children
        )}
      </div>
    </section>
  );
};

Demo.defaultProps = {
  fullPage: false,
};

export default Demo;
