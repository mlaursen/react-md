import React, { FC, Fragment, ReactElement } from "react";
import cn from "classnames";
import { AppBar } from "@react-md/app-bar";
import { Divider } from "@react-md/divider";
import { bem, useAppSize, useToggle } from "@react-md/utils";

import { GITHUB_DEMO_URL } from "constants/index";
import getSandbox from "utils/getSandbox";
import { toTitle } from "utils/toTitle";

import ConditionalFullPageDialog from "components/ConditionalFullPageDialog";
import Heading from "components/Heading";
import { Markdown } from "components/Markdown";
import { ClosePhone } from "components/Phone";

import "./Demo.scss";
import CodePreview from "./CodePreview";
import GithubDemoLink from "./GithubDemoLink";
import Sandbox from "./Sandbox";

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
  disableCard?: boolean;

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
      | "fullPage"
      | "phoneFullPage"
      | "mobileFullPage"
      | "fullPageFAB"
      | "disableCard"
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
    disableCard,
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

  const { isPhone, isTablet } = useAppSize();
  let dialogDisabled = !fullPage;
  if (phoneFullPage) {
    dialogDisabled = !isPhone;
  } else if (mobileFullPage) {
    dialogDisabled = !isPhone && !isTablet;
  }

  const [toggled, enable, disable] = useToggle(false);
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
        <div
          id={`${id}-preview`}
          className={cn(!disableCard && block("preview"))}
        >
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
  disableCard: false,
};

export default Demo;
