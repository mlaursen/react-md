import React, { FunctionComponent } from "react";
import { Text, TextContainer } from "@react-md/typography";

import { CodeBlock } from "components/Code";
import { Markdown } from "components/Markdown";
import Heading from "components/Heading";

import "./package-home.scss";
import Installation from "./Installation";
import StyleInfo from "./StyleInfo";

export interface IPackageHomeProps {
  name: string;
  description: string;
  isStyleable?: boolean;
  recommendations?: string[];
}

type WithDefaultProps = IPackageHomeProps &
  Required<Pick<IPackageHomeProps, "isStyleable" | "recommendations">>;

const PackageHome: FunctionComponent<IPackageHomeProps> = props => {
  const {
    name,
    description,
    isStyleable,
    recommendations,
  } = props as WithDefaultProps;

  return (
    <TextContainer>
      <Heading id={`package-${name}`} level={2} className="package-home__title">
        {name}
      </Heading>
      <Markdown className="package-home__desc">{description}</Markdown>
      <Installation name={name} recommendations={recommendations} />
      <StyleInfo isStyleable={isStyleable} />
    </TextContainer>
  );
};

PackageHome.defaultProps = {
  isStyleable: true,
  recommendations: [],
};

export default PackageHome;
