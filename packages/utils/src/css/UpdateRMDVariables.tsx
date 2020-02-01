import React, {
  MutableRefObject,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import UpdateVariables, { UpdateVariablesProps } from "./UpdateVariables";

import {
  CSSVariable,
  fixVariables,
  resolveVariables,
  toCSSVariableName,
} from "./variables";

const RMD_PREFIX = "--rmd-";
const loaded: MutableRefObject<CSSVariable[]> = { current: [] };

function UpdateRMDVariables({
  variables,
  ...props
}: UpdateVariablesProps): ReactElement {
  if (process.env.NODE_ENV !== "production") {
    // only want this check functionality to work in dev mode and should be removed
    // in prod to reduce network requests and bundle size
    /* eslint-disable react-hooks/rules-of-hooks */

    // when not in prod, try to "verify" that the user provided a valid react-md css variable
    // to update. This will try to import all packages that have a scssVariables file and extract
    // their theme variables.
    const [rmdVariables, setRMDVariables] = useState(loaded.current);
    if (loaded.current.length && !rmdVariables.length) {
      setRMDVariables(loaded.current);
    }

    useEffect(() => {
      if (loaded.current.length) {
        return;
      }

      let cancelled = false;
      (async function load() {
        const variables = await resolveVariables();
        loaded.current = variables;
        if (!cancelled) {
          setRMDVariables(variables);
        }
      })();

      return () => {
        cancelled = true;
      };
    });

    const warned = useRef<string[]>([]);
    useEffect(() => {
      if (!rmdVariables.length) {
        return;
      }

      variables.forEach(cssVar => {
        const { name: varName } = cssVar;
        const name = toCSSVariableName(varName, "--rmd-");
        if (
          !rmdVariables.find(v => v.name === name) &&
          !warned.current.includes(name)
        ) {
          /* eslint-disable no-console */
          console.error(`Found an invalid react-md css variable passed to the \`UpdateRMDVariables\` component:
  - provided name: \`${varName}\`
  - lookup name: \`${name}\`
`);
          console.error(
            "Check the spelling of the variable or that is is really an exposed react-md theme css variable."
          );
          console.error(
            "Here is a list of all the found css variables from react-md:"
          );
          console.table(rmdVariables);

          warned.current.push(name);
        }
      });
    }, [rmdVariables, variables]);
  }

  return (
    <UpdateVariables
      {...props}
      variables={fixVariables(variables, RMD_PREFIX)}
    />
  );
}

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    UpdateRMDVariables.propTypes = {
      variables: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        })
      ).isRequired,
    };
  } catch (e) {}
}

export default UpdateRMDVariables;
