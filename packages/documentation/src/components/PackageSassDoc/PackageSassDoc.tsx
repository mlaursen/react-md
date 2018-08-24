import * as React from "react";
import { Text } from "@react-md/typography";
import { IFlattenedSassDoc } from "types/sassdoc";

import "./package-sassdoc.scss";
import SassDoc from "./SassDoc";

export interface IPackageSassDocProps {
  name: string;
  sassdoc: IFlattenedSassDoc;
}

export default class PackageSassDoc extends React.Component<IPackageSassDocProps> {
  public render() {
    const {
      name,
      sassdoc: { variables, functions, mixins },
    } = this.props;
    return (
      <div className="package-sassdoc">
        <SassDoc name="Variables" list={variables} />
        <SassDoc name="Functions" list={functions} />
        <SassDoc name="Mixins" list={mixins} />
      </div>
    );
  }
}
