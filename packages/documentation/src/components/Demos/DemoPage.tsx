import React, { FC } from "react";
import { cnb } from "cnbuilder";
import { defaults } from "lodash";

import { toId } from "utils/toTitle";

import Demo from "./Demo";
import DemoPageHeader from "./DemoPageHeader";
import DemoPageFont from "./DemoPageFont";
import { DemoPageConfig, DemoProps, DemoConfig } from "./types";

export interface DemoPageProps extends DemoPageConfig {
  className?: string;
  packageName: string;
}

type DefaultProps = Required<Pick<DemoPageProps, "fonts" | "disableCard">>;
type WithDefaultProps = DemoPageProps & DefaultProps;

const getDemoProps = (
  props: DemoPageProps,
  demo: DemoConfig,
  index: number
): DemoProps & { key: string } => {
  const { name } = demo;
  const { packageName } = props;
  const id = toId(name);
  const config = defaults({}, demo, props);
  return {
    ...demo,
    ...config,
    key: id,
    id,
    index,
    packageName,
  };
};

const DemoPage: FC<DemoPageProps> = props => {
  const {
    demos,
    description,
    packageName,
    className,
    fonts,
  } = props as WithDefaultProps;

  return (
    <div id="demo-page-container" className={cnb("demo-page", className)}>
      {fonts.map(font => (
        <DemoPageFont font={font} key={font} />
      ))}
      <DemoPageHeader packageName={packageName}>{description}</DemoPageHeader>
      {demos.map((demo, index) => (
        <Demo {...getDemoProps(props, demo, index)} />
      ))}
    </div>
  );
};

DemoPage.defaultProps = {
  fonts: [],
  disableCard: false,
};

export default DemoPage;
