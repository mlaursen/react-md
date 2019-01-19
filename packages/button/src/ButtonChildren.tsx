import * as React from "react";

export interface IButtonChildrenProps {
  children?: React.ReactNode;
  preventColorPollution: boolean;
}

const ButtonChildren: React.FunctionComponent<IButtonChildrenProps> = ({
  preventColorPollution,
  children,
}) => {
  if (!preventColorPollution) {
    return <React.Fragment>{children}</React.Fragment>;
  }

  return (
    <React.Fragment>
      <span aria-hidden="true" className="rmd-button__content">
        {children}
      </span>
      <span className="rmd-button__content-mask">{children}</span>
    </React.Fragment>
  );
};

export default ButtonChildren;
