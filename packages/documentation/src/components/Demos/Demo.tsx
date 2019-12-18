import React, { FC, Fragment } from "react";
import cn from "classnames";
import { AppBar } from "@react-md/app-bar";
import { Divider } from "@react-md/divider";
import { bem, useAppSize, useToggle } from "@react-md/utils";

import { GITHUB_DEMO_URL } from "constants/github";
import getSandbox from "utils/getSandbox";
import { toTitle } from "utils/toTitle";

import ConditionalFullPageDialog from "components/ConditionalFullPageDialog";
import Heading from "components/Heading";
import { Markdown } from "components/Markdown";
import Phone, { ClosePhone } from "components/Phone";

import CodePreview from "./CodePreview";
import GithubDemoLink from "./GithubDemoLink";
import Sandbox from "./Sandbox";
import { DemoProps } from "./types";

import "./Demo.scss";

type WithDefaultProps = DemoProps &
  Required<
    Pick<
      DemoProps,
      | "fullPage"
      | "phoneFullPage"
      | "mobileFullPage"
      | "fullPageFAB"
      | "disableCard"
      | "emulated"
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
    emulated,
    fullPageFAB,
    disableCard,
  } = props as WithDefaultProps;

  const title = toTitle(packageName, "");
  let fileName = `${GITHUB_DEMO_URL}/${title}/${name.replace(/ /g, "")}`;

  if (!fileName.endsWith(".tsx")) {
    fileName = `${fileName}.tsx`;
  }

  const { isPhone, isTablet, isDesktop } = useAppSize();
  let dialogDisabled = !fullPage;
  if (phoneFullPage) {
    dialogDisabled = !isPhone;
  } else if (mobileFullPage || emulated) {
    dialogDisabled = !isPhone && !isTablet;
  }

  let content = children;
  if (emulated && isDesktop) {
    content = (
      <Phone
        id={`${id}-phone`}
        {...(typeof emulated !== "boolean" ? emulated : undefined)}
      >
        {children}
      </Phone>
    );
  }

  let {
    disableFullPageAppBar,
    disableFullPageContent,
  } = props as WithDefaultProps;
  if (emulated && typeof emulated === "object" && !emulated.appBar) {
    disableFullPageAppBar = true;
    disableFullPageContent = true;
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
              {content}
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
  emulated: false,
};

export default Demo;
