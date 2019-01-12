import * as React from "react";
import { Text, ITextProps } from "@react-md/typography";

import BannerSource from "./BannerSource";

export interface IBannerProps extends ITextProps {
  source?: string;
  sourceLine?: number;
}

interface IBannerWithSource extends IBannerProps {
  source: string;
  sourceLine: number;
}

const Banner: React.FunctionComponent<IBannerProps> = ({ children, className, source, sourceLine, ...props }) => (
  <Text {...props} className="documentation-page__banner">
    {children}
    {source && sourceLine && <BannerSource source={source} sourceLine={sourceLine} />}
  </Text>
);

Banner.defaultProps = {
  type: "headline-2",
};

export default Banner;
