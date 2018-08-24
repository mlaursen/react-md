import * as React from "react";
import cn from "classnames";
import { Text, ITextProps } from "@react-md/typography";

const SassDocTitle: React.SFC<ITextProps> = ({ children, className, ...props }) => (
  <Text {...props} className={cn("sassdoc__title", className)}>
    {children}
  </Text>
);

SassDocTitle.defaultProps = {
  type: "headline-5",
};

export default SassDocTitle;
