import * as React from "react";
import cn from "classnames";
import { Text, ITextProps, DefaultTextProps } from "@react-md/typography";

export interface ISassDocTitleProps extends ITextProps {
  section?: boolean;
}

const SassDocTitle: React.SFC<ISassDocTitleProps & DefaultTextProps> = ({
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
