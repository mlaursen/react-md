import * as React from "react";
import { FontIcon } from "@react-md/icon";

const SOURCE_PREFIX = process.env.GITHUB_URL || "https://github.com/mlaursen/react-md/tree/next/";

export interface IBannerSourceProps {
  source: string;
  sourceLine: number;
}

const BannerSource: React.SFC<IBannerSourceProps> = ({ source, sourceLine }) => {
  const fullSource = `${SOURCE_PREFIX}${source}#L${sourceLine}`;
  let content: React.ReactNode = fullSource;
  if (window.matchMedia("max-width: 600px").matches) {
    content = <FontIcon iconClassName="fa fa-github" />;
  }
  return (
    <a href={fullSource} className="documentation-page__banner-source">
      {content}
    </a>
  );
};

export default BannerSource;
