import React, { FC } from "react";
import cn from "classnames";
import { AppBar } from "@react-md/app-bar";
import { Divider } from "@react-md/divider";
import { useAppSize, useToggle } from "@react-md/utils";

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

import styles from "./Demo.module.scss";
import phoneStyles from "../Phone/Phone.module.scss";

const Demo: FC<DemoProps> = ({
  id,
  name,
  description,
  fullPage = false,
  phoneFullPage = false,
  mobileFullPage = false,
  children,
  index,
  packageName,
  emulated = false,
  fullPageFAB = false,
  fullPageProps,
  disableCard = false,
  disableFullPageAppBar = false,
  disableFullPageContent = false,
}) => {
  const title = toTitle(packageName, "");
  let fileName = `${GITHUB_DEMO_URL}/${title}/${name.replace(
    / |-|\(|\)/g,
    ""
  )}`;

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
  } else if (typeof emulated !== "boolean" && emulated.fabOffset) {
    content = <span className={phoneStyles.fabOffset}>{children}</span>;
  }

  if (
    emulated &&
    typeof emulated === "object" &&
    !emulated.appBar &&
    !emulated.fabOffset
  ) {
    disableFullPageAppBar = true;
    disableFullPageContent = true;
  }

  const [toggled, enable, disable] = useToggle(false);
  return (
    <>
      {index > 0 && <Divider key="divider" className={styles.divider} />}
      <section id={id} className={styles.container}>
        <Heading
          level={2}
          id={`${id}-title`}
          margin={index > 0 ? "bottom" : "initial"}
        >
          {name}
        </Heading>
        <Markdown id={`${id}-description`} className={styles.description}>
          {description}
        </Markdown>
        <AppBar id={`${id}-preview-toolbar`} theme="clear">
          <CodePreview demoId={id} demoTitle={name} folder={title} />
          <Sandbox id={`${id}-sandbox`} getSandbox={getSandbox(title, name)} />
          <GithubDemoLink id={`${id}-github`} href={fileName} />
        </AppBar>
        <div
          id={`${id}-preview`}
          className={cn({
            [styles.preview]: !disableCard,
          })}
        >
          <ConditionalFullPageDialog
            id={`${id}-preview`}
            disabled={dialogDisabled}
            visible={toggled}
            enable={enable}
            disable={disable}
            disableAppBar={disableFullPageAppBar}
            disableContent={disableFullPageContent}
            {...fullPageProps}
          >
            <>
              {content}
              {toggled && fullPageFAB && (
                <ClosePhone id={id} floating onClick={disable} />
              )}
            </>
          </ConditionalFullPageDialog>
        </div>
      </section>
    </>
  );
};

export default Demo;
