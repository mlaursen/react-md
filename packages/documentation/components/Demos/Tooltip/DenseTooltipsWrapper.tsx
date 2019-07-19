import React, { FC, useState, useEffect, useRef } from "react";
import { useDocumentCSSVariables } from "@react-md/theme";
import { CSSVariable } from "@react-md/theme/types/utils";
import scssVariables from "@react-md/tooltip/dist/scssVariables";
import { useInteractionModeContext } from "@react-md/states";

const VARIABLES = [
  {
    name: "rmd-tooltip-font-size",
    value: scssVariables["rmd-tooltip-font-size"],
  },
  {
    name: "rmd-tooltip-line-height",
    value: scssVariables["rmd-tooltip-line-height"],
  },
  {
    name: "rmd-tooltip-min-height",
    value: scssVariables["rmd-tooltip-min-height"],
  },
  {
    name: "rmd-tooltip-horizontal-padding",
    value: scssVariables["rmd-tooltip-horizontal-padding"],
  },
  {
    name: "rmd-tooltip-vertical-padding",
    value: scssVariables["rmd-tooltip-line-wrap-vertical-padding"],
  },
];

/**
 * Whew. This is more difficult than it should have been... So since tooltips get portalled, I can't actually
 * just add a class name to the container element and have all tooltips with the styles updated there. To
 * work around that, I have this wrapper that will remove the "dense" spec that gets applied through scss
 * only while the DenseTooltips example is being interacted with.
 */
const DenseTooltipsWrapper: FC = ({ children }) => {
  const [variables, setVariables] = useState<CSSVariable[]>([]);
  const container = useRef<HTMLDivElement | null>(null);
  const mode = useInteractionModeContext();

  const enableVariables = (): void => {
    if (!variables.length) {
      setVariables(VARIABLES);
    }
  };

  useEffect(() => {
    if (!variables.length) {
      return;
    }

    const handleLeave = (event: Event): void => {
      if (
        !container.current ||
        !event.target ||
        !container.current.contains(event.target as Node)
      ) {
        setVariables([]);
      }
    };

    if (mode === "keyboard") {
      window.addEventListener("focus", handleLeave, true);
    } else {
      window.addEventListener("mouseout", handleLeave, true);
    }

    window.addEventListener("click", handleLeave, true);
    return () => {
      window.removeEventListener("mouseout", handleLeave, true);
      window.removeEventListener("click", handleLeave, true);
      window.removeEventListener("focus", handleLeave, true);
    };
  }, [variables, mode]);

  useDocumentCSSVariables(variables);
  return (
    <div
      ref={container}
      onMouseEnter={enableVariables}
      onFocus={enableVariables}
    >
      {children}
    </div>
  );
};

export default DenseTooltipsWrapper;
