import React, { Fragment, FunctionComponent, ReactElement } from "react";
import { AppBar } from "@react-md/app-bar";
import { Divider } from "@react-md/divider";
import { useAppSizeContext } from "@react-md/sizing";
import { useToggle } from "@react-md/utils";

import ConditionalFullPageDialog from "components/ConditionalFullPageDialog";
import GithubLink from "components/GithubLink";
import Heading from "components/Heading";
import { Markdown } from "components/Markdown";
import { GITHUB_DEMO_URL } from "constants/index";
import { toTitle } from "utils/toTitle";

import "./demo.scss";
import CodePreview from "./CodePreview";
import Sandbox from "./Sandbox";
import getSandboxer from "./sandboxes";

export interface DemoProps {
  id: string;
  name: string;
  description: string;

  /**
   * Boolean if the demo should require a full page modal to display.
   */
  fullPage?: boolean;

  /**
   * Boolean if the demo should require a full page modal to display only
   * for phones.
   */
  phoneFullPage?: boolean;

  /**
   * Boolean if the demo should require a full page modal to display only
   * for mobile devices. This will include both phones and tablets.
   */
  mobileFullPage?: boolean;
  index: number;
  fileName?: string;
  packageName: string;

  /**
   * This should be the demo content to display.
   */
  children: ReactElement;
}

type WithDefaultProps = DemoProps &
  Required<Pick<DemoProps, "fullPage" | "phoneFullPage" | "mobileFullPage">>;

const Demo: FunctionComponent<DemoProps> = props => {
  const {
    id,
    name,
    description,
    fullPage,
    phoneFullPage,
    mobileFullPage,
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

  const { isPhone, isTablet } = useAppSizeContext();
  let dialogDisabled = !fullPage;
  if (phoneFullPage) {
    dialogDisabled = !isPhone;
  } else if (mobileFullPage) {
    dialogDisabled = !isPhone && !isTablet;
  }

  const sandboxDescription = `This is the ${name} example from react-md`;
  const getSandbox = getSandboxer(title, name);
  const { toggled, enable, disable } = useToggle();
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
          <ConditionalFullPageDialog
            id={`${id}-preview`}
            disabled={dialogDisabled}
            visible={toggled}
            enable={enable}
            disable={disable}
          >
            {children}
          </ConditionalFullPageDialog>
        </div>
      </section>
    </Fragment>
  );
};

Demo.defaultProps = {
  fullPage: false,
  phoneFullPage: false,
  mobileFullPage: false,
};

export default Demo;
