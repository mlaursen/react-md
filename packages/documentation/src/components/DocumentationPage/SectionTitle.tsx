import * as React from "react";
import cn from "classnames";
import { TextAnchor, ITextAnchorProps } from "components/Anchor";

const SectionTitle: React.SFC<ITextAnchorProps> = ({ className, children, ...props }) => (
  <TextAnchor {...props} className={cn("documentation-page__section-title", className)}>
    {children}
  </TextAnchor>
);

SectionTitle.defaultProps = {
  type: "headline-3",
};

export default SectionTitle;
