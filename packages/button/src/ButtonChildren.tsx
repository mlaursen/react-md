import * as React from "react";
import { ITextIconSpacingProps, TextIconSpacing } from "@react-md/icon";

export interface IButtonChildrenProps extends ITextIconSpacingProps {
  children?: React.ReactNode;
  disabled: boolean;
}

const ButtonChildren: React.FunctionComponent<IButtonChildrenProps> = ({
  disabled,
  children,
  ...props
}) => {
  let content = <TextIconSpacing {...props}>{children}</TextIconSpacing>;

  if (!disabled) {
    content = (
      <React.Fragment>
        <span aria-hidden="true" className="rmd-button__content">
          {content}
        </span>
        <span className="rmd-button__content-mask">{content}</span>
      </React.Fragment>
    );
  }

  return content;
};

export default ButtonChildren;
