import React, {
  useContext,
  Fragment,
  FunctionComponent,
  ReactNode,
} from "react";

import { ColorPollutionContext } from "./PreventColorPollution";

export interface IFixColorPollutionProps {
  children: ReactNode;
}

/**
 * This component is used to alongside the `ColorPollutionContext` and the
 * `rmd-states-prevent-color-pollution` scss variable. This will modify
 * the children of your "interactiable" element so that their text
 * color will not have the opacity applied to them as well.
 */
const FixColorPollution: FunctionComponent<IFixColorPollutionProps> = ({
  children,
}) => {
  const isFixEnabled = useContext(ColorPollutionContext);
  if (!isFixEnabled) {
    return <Fragment>{children}</Fragment>;
  }

  return (
    <Fragment>
      <span aria-hidden="true" className="rmd-states__content-mask">
        {children}
      </span>
      <span className="rmd-states__content-overlay">{children}</span>
    </Fragment>
  );
};

export default FixColorPollution;
