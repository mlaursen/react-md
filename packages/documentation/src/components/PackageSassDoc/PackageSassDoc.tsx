import * as React from "react";
import { Button } from "@react-md/button";
import { SearchSVGIcon } from "@react-md/material-icons";

import { IFlattenedSassDoc } from "types/sassdoc";

import "./package-sassdoc.scss";
import SassDoc from "./SassDoc";
import Search from "./Search";

export interface IPackageSassDocProps {
  name: string;
  sassdoc: IFlattenedSassDoc;
}

export default class PackageSassDoc extends React.Component<IPackageSassDocProps> {
  public render() {
    const { name, sassdoc } = this.props;
    const { variables, functions, mixins } = sassdoc;

    return (
      <div className="package-sassdoc">
        <SassDoc name="Variables" list={variables} />
        <SassDoc name="Functions" list={functions} />
        <SassDoc name="Mixins" list={mixins} />
        <Search sassdoc={sassdoc} />
      </div>
    );
  }
}
