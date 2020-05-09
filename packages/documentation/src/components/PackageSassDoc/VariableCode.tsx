import React, { FC } from "react";
import { Switch, useChecked } from "@react-md/form";

import { CodeBlock } from "components/Code";
import { FormattedVariableItem } from "utils/sassdoc";

export interface VariableCodeProps
  extends Pick<
    FormattedVariableItem,
    "name" | "value" | "compiled" | "overridable"
  > {
  baseId: string;
}

const VariableCode: FC<VariableCodeProps> = ({
  baseId,
  name,
  value,
  compiled,
  overridable,
}) => {
  const [enabled, handleChange] = useChecked(false);
  let code = `${value}${overridable ? " !default" : ""};`;
  if (enabled && compiled) {
    code = `${compiled};`;
  }

  const checkboxId = `${baseId}-compiled`;
  return (
    <>
      {compiled && (
        <Switch
          id={checkboxId}
          name="compiledToggle"
          checked={enabled}
          onChange={handleChange}
          label="Default compiled value"
        />
      )}
      <CodeBlock language="scss">{`$${name}: ${code}`}</CodeBlock>
    </>
  );
};

export default VariableCode;
