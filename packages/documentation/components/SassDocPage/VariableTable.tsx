import React, { FunctionComponent } from "react";
import { FormattedVariableSassDoc } from "types/formattedSassDoc";
import { Markdown } from "components/Markdown";
import { Code, CodeBlock } from "components/Code";

export interface VariableTableProps {
  variables: FormattedVariableSassDoc[];
}

const VariableTable: FunctionComponent<VariableTableProps> = ({
  variables,
}) => {
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
