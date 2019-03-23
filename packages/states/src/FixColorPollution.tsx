import React, {
  isValidElement,
  Fragment,
  FunctionComponent,
  ReactNode,
} from "react";
import useStatesContext from "./useStatesContext";

export interface FixColorPollutionProps {
  enabled?: boolean;
  children: ReactNode;
}

/**
 * This component is used to alongside the `ColorPollutionContext` and the
 * `rmd-states-prevent-color-pollution` scss variable. This will modify
 * the children of your "interactiable" element so that their text
 * color will not have the opacity applied to them as well.
 */
const FixColorPollution: FunctionComponent<FixColorPollutionProps> = ({
  enabled,
  children,
}) => {
  const isFixEnabled =
    typeof enabled === "boolean"
      ? enabled
      : useStatesContext().preventColorPollution;

  if (!isFixEnabled) {
    if (isValidElement(children)) {
      return children;
    }

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

if (process.env.NODE_ENV !== "production") {
  let PropTypes;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    FixColorPollution.propTypes = {
      enabled: PropTypes.bool,
      children: PropTypes.node.isRequired,
    };
  }
}

export default FixColorPollution;
