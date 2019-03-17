import React, { FunctionComponent, ReactNode, Fragment } from "react";
import cn from "classnames";
import { AppBar } from "@react-md/app-bar";
import { Divider } from "@react-md/divider";
import { CodeSVGIcon } from "@react-md/material-icons";

import AppBarAction from "components/AppBarAction";
import GithubLink from "components/GithubLink";
import Heading from "components/Heading";
import { Markdown } from "components/Markdown";
import { GITHUB_DEMO_URL } from "constants/index";

import { toTitle } from "utils/toTitle";

import "./demo.scss";
import FullPageDemo from "./FullPageDemo";
import Sandbox from "./Sandbox";
import getSandboxer from "./sandboxes";
import CodePreview from "./CodePreview";

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

  const title = toTitle(packageName, "");
  let { fileName } = props;
  if (!fileName) {
    fileName = `${GITHUB_DEMO_URL}/${title}/${name.replace(/ /g, "")}`;
  }

  if (!fileName.endsWith(".tsx")) {
    fileName = `${fileName}.tsx`;
  }

  const sandboxDescription = `This is the ${name} example from react-md`;
  const getSandbox = getSandboxer(title, name);
  return (
    <Fragment>
      {index > 0 && <Divider key="divider" className="demo__divider" />}
      <section id={id} className="demo">
        <Heading
          level={2}
          id={`${id}-title`}
          noMarginTop={index > 0}
          className="demo__title"
        >
          {name}
        </Heading>
        <Markdown id={`${id}-description`} className="demo__description">
          {description}
        </Markdown>
        <AppBar id={`${id}-preview-toolbar`} theme="clear">
          <CodePreview demoId={id} demoTitle={name} getSandbox={getSandbox} />
          <Sandbox
            id={`${id}-sandbox`}
            title={name}
            description={sandboxDescription}
            packageName={packageName}
            getSandbox={getSandbox}
          />
          <GithubLink id={`${id}-github`} href={fileName} />
        </AppBar>
        <div id={`${id}-code-preview`} />
        <div id={`${id}-preview`} className="demo__preview">
          {fullPage ? (
            <FullPageDemo id={`${id}-preview`}>{children}</FullPageDemo>
          ) : (
            children
          )}
        </div>
      </section>
    </Fragment>
  );
};

Demo.defaultProps = {
  fullPage: false,
};

export default Demo;
