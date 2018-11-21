import * as React from "react";
import cn from "classnames";
import { Text, ITextProps } from "@react-md/typography";

export interface ISassDocTitleProps extends ITextProps {
  section?: boolean;
}

const SassDocTitle: React.FunctionComponent<ISassDocTitleProps> = ({
  children,
  className,
  section,
  ...props
}) => (
  <Text
    {...props}
    className={cn(
      "sassdoc__title",
      {
        "sassdoc__title--section": section,
      },
      className
    )}
  >
    {children}
  </Text>
);

SassDocTitle.defaultProps = {
  type: "headline-5",
};

export default SassDocTitle;
