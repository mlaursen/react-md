import React, { Fragment, FC, ReactElement } from "react";
import { AppBar } from "@react-md/app-bar";
import { Divider } from "@react-md/divider";
import { useToggle } from "@react-md/utils";

import ConditionalFullPageDialog from "components/ConditionalFullPageDialog";
import Heading from "components/Heading";
import { Markdown } from "components/Markdown";
import { GITHUB_DEMO_URL } from "constants/index";
import { toTitle } from "utils/toTitle";

import "./demo.scss";
import CodePreview from "./CodePreview";
import Sandbox from "./Sandbox";
import useAppSizeContext from "components/Layout/useAppSizeContext";
import GithubDemoLink from "./GithubDemoLink";
import { ClosePhone } from "components/Phone";
import { bem } from "@react-md/theme";
import getSandbox from "utils/getSandbox";

export interface DemoProps {
  id: string;
  name: string;
  description: string;

  /**
   * Boolean if the demo should require a full page modal to display.
   */
  fullPage?: boolean;
  disableFullPageAppBar?: boolean;
  disableFullPageContent?: boolean;
  fullPageFAB?: boolean;

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
  Required<
    Pick<
      DemoProps,
      "fullPage" | "phoneFullPage" | "mobileFullPage" | "fullPageFAB"
    >
  >;

const block = bem("demo");

const Demo: FC<DemoProps> = props => {
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
    fullPageFAB,
    disableFullPageAppBar,
    disableFullPageContent,
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

  const { toggled, enable, disable } = useToggle();
  return (
    <Fragment>
      {index > 0 && <Divider key="divider" className={block("divider")} />}
      <section id={id} className={block()}>
        <Heading
          level={2}
          id={`${id}-title`}
          margin={index > 0 ? "bottom" : "initial"}
        >
          {name}
        </Heading>
        <Markdown id={`${id}-description`} className={block("description")}>
          {description}
        </Markdown>
        <AppBar id={`${id}-preview-toolbar`} theme="clear">
          <CodePreview demoId={id} demoTitle={name} folder={title} />
          <Sandbox id={`${id}-sandbox`} getSandbox={getSandbox(title, name)} />
          <GithubDemoLink id={`${id}-github`} href={fileName} />
        </AppBar>
        <div id={`${id}-code-preview`} />
        <div id={`${id}-preview`} className={block("preview")}>
          <ConditionalFullPageDialog
            id={`${id}-preview`}
            disabled={dialogDisabled}
            visible={toggled}
            enable={enable}
            disable={disable}
            disableAppBar={disableFullPageAppBar}
            disableContent={disableFullPageContent}
          >
            <Fragment>
              {children}
              {toggled && fullPageFAB && (
                <ClosePhone id={id} floating onClick={disable} />
              )}
            </Fragment>
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
  disableFullPageAppBar: false,
  disableFullPageContent: false,
  fullPageFAB: false,
};

export default Demo;
