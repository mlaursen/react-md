import React, { FunctionComponent, useEffect, useRef, useState } from "react";

import UpdateVariables, { IUpdateVariablesProps } from "./UpdateVariables";
import {
  fixVariables,
  ICSSVariable,
  resolveVariables,
  toCSSVariableName,
} from "./utils";

const UpdateRMDVariables: FunctionComponent<IUpdateVariablesProps> = ({
  variables: propVariables,
  ...props
}) => {
  if (process.env.NODE_ENV !== "production") {
    const renderRef = useRef(false);
    const [rmdVariables, setRMDVariables] = useState<ICSSVariable[]>([]);
    if (!renderRef.current) {
      renderRef.current = true;

      resolveVariables(setRMDVariables);
    }

    useEffect(() => {
      if (!rmdVariables.length) {
        return;
      }

      propVariables.forEach(cssVar => {
        const { name: varName } = cssVar;
        const name = toCSSVariableName(varName, "--rmd-");
        if (!rmdVariables.find(v => v.name === name)) {
          console.error(`Found an invalid react-md css variable passed to the \`UpdateRMDVariables\` component:
  - provided name: \`${varName}\`
  - lookup name: \`${name}\`
`);
          console.error(
            "Check the spelling of the variable or that is is really an exposed react-md theme css variable."
          );
        }
      });
    }, [rmdVariables, propVariables]);
  }
  const variables = fixVariables(propVariables, "--rmd-");

  return <UpdateVariables {...props} variables={variables} />;
};

export default UpdateRMDVariables;
