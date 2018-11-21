import * as React from "react";
import cn from "classnames";
import { Text, ITextProps } from "@react-md/typography";
import { kebabCase } from "lodash";

import { IAnchorProps, default as Anchor } from "./Anchor";

export type ITextAnchorProps = ITextProps & IAnchorProps & {
  linkClassName?: string;
}

const TextAnchor: React.SFC<ITextAnchorProps> = ({
  id: propId,
  title,
  className,
  linkClassName,
  after,
  children,
  ...props
}) => {
  const id = kebabCase(propId);

  return (
    <Text id={id} {...props} className={cn(Anchor.anchorTargetClassName, className)}>
      {children}
      <Anchor id={id} title={title} className={linkClassName} after={after} />
    </Text>
  );
};

TextAnchor.defaultProps = {
  after: true,
};

export default TextAnchor;
