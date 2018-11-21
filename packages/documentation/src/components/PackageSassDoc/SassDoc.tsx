import * as React from "react";
import { SassDocType } from "sassdoc";

import { Text } from "@react-md/typography";
import { IVariableSassDoc, IMixinSassDoc, IFunctionSassDoc } from "types/sassdoc";

import SassDocTitle from "./SassDocTitle";

import Section from "./Section";

export interface ISassDocProps {
  list: Array<IVariableSassDoc | IMixinSassDoc | IFunctionSassDoc>;
  name: "Variables" | "Functions" | "Mixins";
}

const SassDoc: React.FunctionComponent<ISassDocProps> = ({ name, list }) => {
  if (!list.length) {
    return null;
  }

  const sectionType = name.toLowerCase().substring(0, name.length - 1) as SassDocType;
  return (
    <div id={`sassdoc-${sectionType}`} className="package-sassdoc__block sassdoc" tabIndex={-1}>
      <SassDocTitle type="headline-2" section={true}>
        {name}
      </SassDocTitle>
      {list.map(sassdoc => (
        <Section key={sassdoc.name} sassdoc={sassdoc} type={sectionType} />
      ))}
    </div>
  );
};

export default SassDoc;
