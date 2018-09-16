import * as React from "react";
import { Type } from "sassdoc";

import { IVariableLookup } from "types/sassdoc";
const variables = require("constants/sassdocVariables.json") as IVariableLookup;

export interface IColorPreviewProps {
  name: string;
  type: Type;
  value?: string;
}

export default class ColorPreview extends React.Component<IColorPreviewProps> {
  constructor(props: IColorPreviewProps) {
    super(props);

    this.state = {};
  }

  public render() {
    const { name, value, type } = this.props;
    if (!value || type !== "Color") {
      return null;
    }

    return <span className="sassdoc__color-preview" tabIndex={0} style={{ backgroundColor: value }} />;
  }
}
