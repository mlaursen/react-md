import React, { FC } from "react";

import { CodeBlock } from "components/Code";
import { Markdown } from "components/Markdown";
import { FormattedVariableSassDoc } from "types/formattedSassDoc";

export interface VariableTableProps {
  variables: FormattedVariableSassDoc[];
}

const VariableTable: FC<VariableTableProps> = ({ variables }) => {
  return (
    <div className="table-container">
      <table id="sassdoc-variables" className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {variables.map(variable => (
            <tr key={variable.name}>
              <td>
                <CodeBlock language="scss">{`$${variable.name}: ${
                  variable.value
                }${variable.configurable ? " !default" : ""}`}</CodeBlock>
              </td>
              <td>
                <Markdown>{variable.description}</Markdown>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VariableTable;
