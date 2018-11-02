import * as React from "react";
import { uniq, flatten } from "lodash";
import { SectionTitle } from "components/DocumentationPage";

import {
  IDocumentedFile,
  IDocumentedComponent,
  IDocumentedInterface,
} from "components/Exports/types.d";

import PropTable from "./PropTable";

export interface IPropsProps {
  file: IDocumentedFile;
  component: IDocumentedComponent;
}

const Props: React.SFC<IPropsProps> = ({ file, component }) => {
  const componentReferences = uniq(
    flatten(component.typeParameters.map(({ typeReferences }) => typeReferences))
  );

  const mainProps = file[component.props] as IDocumentedInterface;
  if (!mainProps || mainProps.type !== "interface") {
    return null;
  }

  const external = {};

  // if (componentReferences.length && mainProps.typeParameters.length) {
  // }
  // const mainProps: IDocumentedInterface | undefined = file[propReference]
  return (
    <React.Fragment>
      <SectionTitle id="props">Props</SectionTitle>
      <PropTable
        attributes={mainProps.attributes}
        file={file}
        typeParameters={mainProps.typeParameters}
        references={componentReferences}
      />
    </React.Fragment>
  );
};

export default Props;
