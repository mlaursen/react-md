import React, { FC } from "react";
import { TextField } from "@react-md/form";

import TextFieldThemeConfig from "./TextFieldThemeConfig";

const TextFieldExample: FC = () => (
  <TextFieldThemeConfig
    idPrefix="text-field"
    renderField={props => <TextField id="configurable-text-field" {...props} />}
  />
);

export default TextFieldExample;
