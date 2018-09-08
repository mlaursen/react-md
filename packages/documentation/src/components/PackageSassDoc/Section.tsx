import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@react-md/link";
import { ISassDoc, SassDocType } from "types/sassdoc";

import ExpandableSource from "./ExpandableSource";
import Description from "./Description";
import Type from "./Type";
import Parameters from "./Parameters";
import SassDocTitle from "./SassDocTitle";

export interface ISectionProps {
  sassdoc: ISassDoc;
  type: SassDocType;
}

export type SectionType = "variable" | "function" | "mixin";

const Section: React.SFC<ISectionProps> = ({ sassdoc, type }) => {
  let { code = "" } = sassdoc;
  const { type: sassdocType, name, description, parameters } = sassdoc;
  if (code) {
    code = `\`\`\`scss
${code}
\`\`\``;
  }

  const id = `${type}-${name}`;
  return (
    <React.Fragment>
      <SassDocTitle type="headline-3" className="sassdoc__name">
        {({ className }) => (
          <Link id={id} to={`#${id}`} component={RouterLink} className={className}>
            {name}
          </Link>
        )}
      </SassDocTitle>
      <ExpandableSource linkId={id} code={code} />
      <Description>{description}</Description>
      <Type>{sassdocType}</Type>
      <Parameters parameters={parameters} />
    </React.Fragment>
  );
};

export default Section;
