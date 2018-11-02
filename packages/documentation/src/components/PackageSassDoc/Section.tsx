import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@react-md/link";
import { LinkSVGIcon } from "@react-md/material-icons";
import { SassDocType } from "sassdoc";

import { ISassDoc } from "types/sassdoc";
import SassDocTitle from "./SassDocTitle";
import ExpandableSource from "./ExpandableSource";
import Description from "./Description";
import Type from "./Type";
import ColorPreview from "./ColorPreview";
import Parameters from "./Parameters";
import ReferenceList from "./ReferenceList";
import Links from "./Links";
import Throws from "./Throws";
import Examples from "./Examples";

export interface ISectionProps {
  sassdoc: ISassDoc;
  type: SassDocType;
}

export type SectionType = "variable" | "function" | "mixin";

function withScssCode(code: string): string {
  if (!code) {
    return code;
  }

  return `\`\`\`scss
${code}
\`\`\``;
}

const Section: React.SFC<ISectionProps> = ({ sassdoc, type }) => {
  const {
    type: sassdocType,
    name,
    description,
    parameters,
    requires,
    usedBy,
    links,
    see,
    throws,
    examples,
    resolvedValue,
  } = sassdoc;
  const code = withScssCode(sassdoc.code || "");
  const compiledCode = withScssCode(resolvedValue || "");
  const id = `${type}-${name}`;
  return (
    <React.Fragment>
      <SassDocTitle id={id} type="headline-3" className="sassdoc__name">
        {name}
        <Link to={`#${id}`} component={RouterLink} className="sassdoc__quick-link">
          <LinkSVGIcon title={`Quick Link to ${name}`} />
        </Link>
        <Type>{sassdocType}</Type>
        <ColorPreview name={name} type={sassdocType} value={sassdoc.value} />
      </SassDocTitle>
      <ExpandableSource
        linkId={id}
        code={code}
        compiledCode={compiledCode}
        expandable={type !== "variable"}
      />
      <Description>{description}</Description>
      <Parameters parameters={parameters} />
      <Throws throws={throws} />
      <Examples sassdocId={id} examples={examples} />
      <ReferenceList list={see}>Other References</ReferenceList>
      <Links links={links} />
      <ReferenceList list={requires}>Requires</ReferenceList>
      <ReferenceList list={usedBy}>Used By</ReferenceList>
    </React.Fragment>
  );
};

export default Section;
